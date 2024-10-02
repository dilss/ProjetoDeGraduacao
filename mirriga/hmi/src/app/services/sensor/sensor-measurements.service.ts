import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject, take, zip } from 'rxjs';
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

  private singleSensorMeasurements: SensorMeasurement[] = [];

  readonly handleError = (error: any) => of({ error: error });

  measurementsListChanged$: Subject<SensorMeasurement[]> = new Subject<
    SensorMeasurement[]
  >();

  singleSensorMeasurementsListChanged$: Subject<SensorMeasurement[]> =
    new Subject<SensorMeasurement[]>();

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

  fetchEachSensorMostRecentMeasurement(): void {
    let mostRecentMeasurements = this.sensorService.sensorsList.map((sensor) =>
      this.fetchMostRecentMeasurementFromSensor(sensor.deviceEui).pipe(
        catchError((error, caught) => this.handleError(error))
      )
    );
    zip(mostRecentMeasurements).subscribe((result) => {
      let measurements = result.map((value) => {
        if (value instanceof SensorMeasurement) {
          return value;
        }
      });
      this.eachSensorMostRecentMeasurement = [...measurements];
      this.mostRecentMeasurementsListChanged$.next([...measurements]);
    });
  }

  fetchOneSensorMostRecentMeasurement(sensorEui: string): void {
    this.fetchMostRecentMeasurementFromSensor(sensorEui).subscribe(
      (measurement) => {
        if (!measurement) {
          return;
        }
        this.updateMostRecentMeasurementsList(measurement);
      }
    );
  }

  updateMostRecentMeasurementsList(newMeasurement: SensorMeasurement) {
    let index = this.eachSensorMostRecentMeasurement.findIndex(
      (measurement) => newMeasurement.deviceEui == measurement?.deviceEui
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

  getSensorsMostRecentMeasurements(): SensorMeasurement[] {
    return [...this.eachSensorMostRecentMeasurement];
  }

  getSingleSensorMeasurements(): SensorMeasurement[] {
    return [...this.singleSensorMeasurements];
  }
}
