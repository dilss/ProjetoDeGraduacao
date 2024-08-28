import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
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
      next: (message: Map<string, string>) => {
        this. toastService.showInfo(`Novos dados recebidos do sensor \" ${message['sensorName']}\". Dado: ${message['data']}` );
        console.log('Message received: ' + message); // Called whenever there is a message from the server.
      },

      error: (err) => {
        this.toastService.showError(err);
        console.log(err);
      }, // Called if at any point WebSocket API signals some kind of error.
      complete: () => {
        this.toastService.showWarn("A conexão via socket foi fechada")
        return console.log('complete');
      }, // Called when connection is closed (for whatever reason).
    });
  }
}
