import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { SensorMeasurement } from '../../models/sensor/sensor-measurements.model';

@Injectable({
  providedIn: 'root',
})
export class SensorMeasurementsService {
  private readonly baseUrl: String =
    'http://localhost:8081/api/sensors-measurements';

  private measurements: SensorMeasurement[] = [];

  private singleSensorMeasurements: SensorMeasurement[] = [];

  readonly handleError = (error: any) => of({ error: error });

  measurementsListChanged$: Subject<SensorMeasurement[]> = new Subject<
    SensorMeasurement[]
  >();

  singleSensorMeasurementsListChanged$: Subject<SensorMeasurement[]> =
    new Subject<SensorMeasurement[]>();

  sensorPushedMeasurement$: Subject<SensorMeasurement> =
    new Subject<SensorMeasurement>();

  constructor(private http: HttpClient, private toastService: ToastService) {}

  fetchAllSensorsMeasurementsSince(timeAgo: string): void {
    this.http
      .get<SensorMeasurement[]>(`${this.baseUrl}/${timeAgo}`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: SensorMeasurement[]) => {
          (this.measurements = [...responseData]),
            this.measurementsListChanged$.next([...this.measurements]);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

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
          measurements.sort( (a,b) => new Date(b?.timestamp).getTime() - new Date(a?.timestamp).getTime());
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

  fetchMostRecentMeasurementFromSensor(
    sensorEui: string
  ): Observable<SensorMeasurement> {
    return this.http.get<SensorMeasurement>(
      `${this.baseUrl}/${sensorEui}/most-recent`,
      {
        responseType: 'json',
      }
    );
  }

  getSingleSensorMeasurements(): SensorMeasurement[] {
    return [...this.singleSensorMeasurements];
  }
}
