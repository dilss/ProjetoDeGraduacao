import { Injectable } from '@angular/core';
import { SensorKeysModel } from '../../models/sensor/sensor-keys.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Observable, Subject } from 'rxjs';
import { Sensor } from '../../models/sensor/sensor.model';
import { SensorService } from './sensor.service';

@Injectable({
  providedIn: 'root',
})
export class SensorKeyService {
  private readonly baseUrl: String = 'http://localhost:8081/api/sensors';

  sensorKeysChanged$: Subject<SensorKeysModel> = new Subject<SensorKeysModel>();

  addSensorKeysDialogOpen$: Subject<Sensor> = new Subject<Sensor>();

  updateSensorKeysDialogOpen$: Subject<Sensor> = new Subject<Sensor>();

  dialogClosed$: Subject<void> = new Subject<void>();

  constructor(
    private http: HttpClient,
    private sensorService: SensorService,
    private toastService: ToastService
  ) {}

  getSensorKeys(sensorEui: string): Observable<SensorKeysModel> {
    return this.http.get<SensorKeysModel>(`${this.baseUrl}/${sensorEui}/keys`);
  }

  addSensorNetworkKey(sensorEui: string, sensorKeys: SensorKeysModel): void {
    this.http
      .post(
        `${this.baseUrl}/${sensorEui}/keys`,
        { nwkKey: sensorKeys.deviceKeys.nwkKey },
        { responseType: 'json' }
      )
      .subscribe({
        next: (_result: boolean) => {
          let sensor = this.sensorService.sensorsList.find( sensor => sensorEui == sensor.deviceEui);
          this.sensorService.fetchSensors();
          this.closeDialog();
          this.toastService.showSuccess(
            `Chave de rede adicionada ao sensor "${sensor.name}".`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.message),
      });
  }

  updateSensorNetworkKey(sensorEui: string, sensorKeys: SensorKeysModel): void {
    this.http
      .put(
        `${this.baseUrl}/${sensorEui}/keys`,
        { nwkKey: sensorKeys.deviceKeys.nwkKey },
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (_result: boolean) => {
          let sensor = this.sensorService.sensorsList.find( sensor => sensorEui == sensor.deviceEui);
          this.sensorService.fetchSensors();
          this.closeDialog();
          this.toastService.showSuccess(
            `Chave de rede do sensor "${sensor.name}" atualizada.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.message),
      });
  }

  openAddSensorKeysDialog(sensor: Sensor): void {
    this.addSensorKeysDialogOpen$.next(sensor);
  }

  openUpdateSensorKeysDialog(sensor: Sensor): void {
    this.updateSensorKeysDialogOpen$.next(sensor);
  }

  closeDialog(): void {
    this.dialogClosed$.next();
  }
}
