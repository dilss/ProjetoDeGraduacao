import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Sensor } from '../../models/sensor/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private readonly baseUrl: String = 'http://localhost:8080/api/sensors';

  private sensors: Sensor[] = [];

  sensorListChanged$: Subject<Sensor[]> = new Subject<Sensor[]>();

  createSensorDialogOpen$: Subject<number> = new Subject<number>();

  editSensorDialogOpen$: Subject<Sensor> = new Subject<Sensor>();

  showSensorsDialogOpen$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  dialogClosed$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private toastService: ToastService) {}

  fetchSensors(): void {
    this.http
      .get<Sensor[]>(`${this.baseUrl}`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: Sensor[]) => {
          (this.sensors = [...responseData]),
            this.sensorListChanged$.next(this.sensors);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  createSensor(sensor: Sensor): void {
    this.http
      .post(`${this.baseUrl}`, sensor, { responseType: 'json' })
      .subscribe({
        next: (_sensor: Sensor) => {
          this.fetchSensors();
          this.closeDialog();
          this.toastService.showSuccess(
            `O novo sensor "${sensor.name}" foi adicionado.`
          );
          this.toastService.showWarn(
            `O novo sensor "${sensor.name}" não possui uma chave de rede (nwkKey).`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  deleteSensor(sensorEui: string): void {
    let sensor = this.sensors.find((sensor) => sensor.deviceEui === sensorEui);
    this.http.delete(`${this.baseUrl}/${sensorEui}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchSensors();
        this.toastService.showSuccess(
          `A sensor "${sensor.name}" foi excluído.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse.error.message),
    });
  }

  editSensor(sensor: Sensor): void {
    this.http
      .put(`${this.baseUrl}/${sensor.deviceEui}`, sensor, {
        responseType: 'json',
      })
      .subscribe({
        next: (_sensorId: number) => {
          this.fetchSensors();
          this.closeDialog();
          this.toastService.showSuccess(
            `As altearções no sensor "${sensor.name}" foram salvas.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  get sensorsList() {
    return [...this.sensors];
  }

  openEditSensorDialog(sensor: Sensor): void {
    this.editSensorDialogOpen$.next(sensor);
  }

  openEditSensorWithIdDialog(sensorEui: string): void {
    let sensor = this.sensors.find((sensor) => sensorEui == sensor.deviceEui);
    this.openEditSensorDialog(sensor);
  }

  openCreateSensorDialog(plantationId?: number): void {
    this.createSensorDialogOpen$.next(plantationId);
  }

  openShowSensorsDialog(): void {
    this.showSensorsDialogOpen$.next(true);
  }

  closeDialog(): void {
    this.dialogClosed$.next();
  }
}
