import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  subject = webSocket('ws://localhost:8080/mirriga-web-socket');

  constructor(private toastService: ToastService) {}

  listen(): Subscription {
    return this.subject.subscribe({
      // Called whenever there is a message from the server.
      next: (message: Map<string, string>) => {
        this.toastService.showInfo(
          `Novos dados recebidos do sensor \" ${message['sensorName']}\". Umidade do solo: ${message['data']} g/g`
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
