import { Injectable } from '@angular/core';
import { Observable, Subject, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { SensorMeasurement } from '../../models/sensor/sensor-measurements.model';
import { SensorService } from './sensor.service';

@Injectable({
  providedIn: 'root',
})
export class SensorMeasurementsService {
  private readonly baseUrl: String =
    'http://localhost:8081/api/sensors-measurements';

  private measurements: SensorMeasurement[] = [];

  private eachSensorMostRecentMeasurement: SensorMeasurement[] = [];

  measurementsListChanged$: Subject<SensorMeasurement[]> = new Subject<
    SensorMeasurement[]
  >();

  mostRecentMeasurementsListChanged$: Subject<SensorMeasurement[]> =
    new Subject<SensorMeasurement[]>();

  constructor(
    private http: HttpClient,
    private sensorService: SensorService,
    private toastService: ToastService
  ) {}

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

  getMeasurementsFromSensorSince(
    sensorEui: string,
    timeAgo: string
  ): Observable<SensorMeasurement[]> {
    return this.http.get<SensorMeasurement[]>(
      `${this.baseUrl}/${sensorEui}/${timeAgo}`,
      {
        responseType: 'json',
      }
    );
  }

  fetchEachSensorMostRecentMeasurement(): void {
    let measurements = this.sensorService.sensorsList.map((sensor) =>
      this.fetchMostRecentMeasurementFromSensor(sensor.deviceEui)
    );
    zip(measurements).subscribe((result) => {
      this.eachSensorMostRecentMeasurement = [...result];
      this.mostRecentMeasurementsListChanged$.next([...result]);
    });
  }

  fetchOneSensorMostRecentMeasurement(sensorEui: string): void {
    this.fetchMostRecentMeasurementFromSensor(sensorEui).subscribe(
      (measurement) => this.updateMostRecentMeasurementsList(measurement)
    );
  }

  public updateMostRecentMeasurementsList(newMeasurement: SensorMeasurement) {
    let index = this.eachSensorMostRecentMeasurement.findIndex(
      (measurement) => newMeasurement.deviceEui == measurement.deviceEui
    );

    if (index) {
      this.eachSensorMostRecentMeasurement.splice(index, index, newMeasurement);

      this.mostRecentMeasurementsListChanged$.next([
        ...this.eachSensorMostRecentMeasurement,
      ]);
    }
  }

  private fetchMostRecentMeasurementFromSensor(
    sensorEui: string
  ): Observable<SensorMeasurement> {
    return this.http.get<SensorMeasurement>(
      `${this.baseUrl}/${sensorEui}/most-recent`,
      {
        responseType: 'json',
      }
    );
  }

  sensorsMostRecentMeasurements(): SensorMeasurement[] {
    return [...this.eachSensorMostRecentMeasurement];
  }
}
