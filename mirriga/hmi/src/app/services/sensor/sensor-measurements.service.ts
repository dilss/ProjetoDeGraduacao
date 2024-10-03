import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { SensorMeasurement } from '../../models/sensor/sensor-measurements.model';

@Injectable({
  providedIn: 'root',
})
export class SensorMeasurementsService {
  private readonly baseUrl: String =
    'http://localhost:8081/api/sensors-measurements';

  private singleSensorMeasurements: SensorMeasurement[] = [];

  private eachSensorMostRecentMeasurement: SensorMeasurement[] = [];

  singleSensorMeasurementsListChanged$: Subject<SensorMeasurement[]> =
    new Subject<SensorMeasurement[]>();

  eachSensorMostRecentMeasurementListChanged$: Subject<SensorMeasurement[]> =
    new Subject<SensorMeasurement[]>();

  sensorPushedMeasurement$: Subject<SensorMeasurement> =
    new Subject<SensorMeasurement>();

  constructor(private http: HttpClient, private toastService: ToastService) {}

  fetchMeasurementsFromSensorSince(
    sensorEui: string,
    timeAgo: string = '1d'
  ): void {
    this.http
      .get<SensorMeasurement[]>(`${this.baseUrl}/${sensorEui}/${timeAgo}`, {
        responseType: 'json',
      })
      .subscribe({
        next: (measurements) => {
          measurements.sort(
            (a, b) =>
              new Date(b?.timestamp).getTime() -
              new Date(a?.timestamp).getTime()
          );
          this.singleSensorMeasurements = [...measurements].slice(0, 5);
          this.singleSensorMeasurementsListChanged$.next([
            ...this.singleSensorMeasurements,
          ]);
        },

        error: (_error) =>
          this.toastService.showError(
            `Um erro ocorreu a buscar as medições do sensor de com id "${sensorEui}"`
          ),
      });
  }

  fetchEachSensorMostRecentMeasurementList(): void {
    this.http
      .get<SensorMeasurement[]>(`${this.baseUrl}/each-sensor-most-recent`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: SensorMeasurement[]) => {
          (this.eachSensorMostRecentMeasurement = [...responseData]),
            this.eachSensorMostRecentMeasurementListChanged$.next([
              ...this.eachSensorMostRecentMeasurement,
            ]);
        },

        error: (_error) =>
          this.toastService.showError(
            'Um erro ocorreu a buscar as medições mais recentes dos sensores'
          ),
      });
  }

  getSingleSensorMeasurements(): SensorMeasurement[] {
    return [...this.singleSensorMeasurements];
  }
}
