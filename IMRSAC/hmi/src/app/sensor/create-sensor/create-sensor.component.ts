import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SensorService } from '../../services/sensor/sensor.service';
import { Sensor } from '../../models/sensor/sensor.model';
import { MapService } from '../../services/map/map.service';

@Component({
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
  ],
  standalone: true,
  selector: 'app-create-sensor',
  templateUrl: './create-sensor.component.html',
  styleUrl: './create-sensor.component.css',
})
export class CreateSensorComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  title: string = 'Novo Sensor';
  visible: boolean = false;
  sensorEditId: string;

  subscriptions: Subscription[] = [];

  sensorForm: FormGroup<{
    name: FormControl<string>;
    sensorEui: FormControl<string>;
    latitude: FormControl<number>;
    longitude: FormControl<number>;
  }> = new FormGroup<{
    name: FormControl<string>;
    sensorEui: FormControl<string>;
    latitude: FormControl<number>;
    longitude: FormControl<number>;
  }>({
    name: new FormControl<string>(null, Validators.required),
    sensorEui: new FormControl<string>(null, Validators.required),
    latitude: new FormControl<number>(null, Validators.required),
    longitude: new FormControl<number>(null, Validators.required),
  });

  constructor(
    private sensorService: SensorService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    const sub1 = this.sensorService.createSensorDialogOpen$.subscribe(() => {
      this.isEdit = false;
      this.title = 'Novo Sensor';
      this.showDialog();
    });
    const sub2 = this.sensorService.editSensorDialogOpen$.subscribe(
      (sensor) => {
        this.isEdit = true;
        this.title = 'Editar Sensor';
        this.sensorEditId = sensor.sensorEui;
        this.sensorForm.setValue({
          name: sensor.name,
          sensorEui: sensor.sensorEui,
          latitude: sensor.latitude,
          longitude: sensor.longitude,
        });
        this.showDialog();
      }
    );
    const sub3 = this.sensorService.dialogClosed$.subscribe(() =>
      this.hideDialog()
    );

    const sub4 = this.mapService.rightClickLatLngInPolygon$.subscribe(
      (coordinate: { latitude: number; longitude: number }) => {
        this.sensorForm.setValue({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          name: null,
          sensorEui: null,
        });
      }
    );
    this.subscriptions.push(sub1, sub2, sub3, sub4);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  onSubmit(): void {
    let sensor: Sensor = new Sensor();
    const formValue = { ...this.sensorForm.value };
    sensor.name = formValue.name;
    sensor.sensorEui = formValue.sensorEui;
    sensor.latitude = formValue.latitude;
    sensor.longitude = formValue.longitude;

    if (this.isEdit) {
      sensor.sensorEui = this.sensorEditId;
      this.sensorService.editSensor(sensor);
      return;
    }
    this.sensorService.createSensor(sensor);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
