import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';
import { SensorMeasurementsService } from './sensor/sensor-measurements.service';
import { SensorMeasurement } from '../models/sensor/sensor-measurements.model';
import { MapService } from './map/map.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  subject = webSocket('ws://localhost:8081/mirriga-web-socket');

  constructor(
    private toastService: ToastService,
    private sensorMeasurementsService: SensorMeasurementsService
  ) {}

  listen(): Subscription {
    return this.subject.subscribe({
      // Called whenever there is a message from the server.
      next: (message: Map<string, string>) => {
        this.toastService.showInfo(
          `Novos dados recebidos do sensor \" ${message['sensorName']}\". Umidade do solo: ${message['data']} g/g`
        );
        let measurement: SensorMeasurement = {
          deviceEui: message['sensorEui'],
          sensorName: message['sensorName'],
          soilWaterContent: message['data'],
          timestamp: message['timestamp'],
        };

        this.sensorMeasurementsService.sensorPushedMeasurement$.next(
          measurement
        );
      },

      // Called if at any point WebSocket API signals some kind of error.
      error: (err) => {
        this.toastService.showError(err);
        console.log(err);
      },

      // Called when connection is closed (for whatever reason).
      complete: () => {
        this.toastService.showWarn('A conexão via socket foi fechada');
        return console.log('complete');
      },
    });
  }
}
