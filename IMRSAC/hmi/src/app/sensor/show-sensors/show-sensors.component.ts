import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { SensorService } from '../../services/sensor/sensor.service';
import { Sensor } from '../../models/sensor/sensor.model';
import { MapService } from '../../services/map/map.service';

@Component({
  imports: [CommonModule, DialogModule, DataViewModule, ButtonModule],
  standalone: true,
  selector: 'app-show-sensors',
  templateUrl: './show-sensors.component.html',
  styleUrl: './show-sensors.component.css',
})
export class ShowSensorsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  sensors: Sensor[] = [];
  visible: boolean = false;

  constructor(
    private sensorService: SensorService,
    private mapService: MapService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let sub1 = this.sensorService.sensorListChanged$.subscribe(
      (sensors) => (this.sensors = sensors)
    );
    let sub2 = this.sensorService.showSensorsDialogOpen$.subscribe(
      (isOpen) => (this.visible = isOpen)
    );
    this.subscriptions.push(sub1, sub2);
    this.sensorService.fetchSensors();
  }

  editSensor(sensor: Sensor): void {
    this.visible = false;
    this.sensorService.openEditSensorDialog(sensor);
  }

  deleteSensor(sensorEui: string): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do sensor?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.sensorService.deleteSensor(sensorEui),
      reject: () => this.confirmationService.close(),
    });
  }

  focusSensorOnTheMap(sensor: Sensor): void {
    this.visible = false;
    this.mapService.focusSensorOnMap(sensor);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
