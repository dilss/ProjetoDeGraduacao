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
import { Plantation } from '../../models/plantation/plantation.model';
import { DropdownModule } from 'primeng/dropdown';
import { PlantationService } from '../../services/plantation/plantation.service';

@Component({
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
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

  plantationOptions: Plantation[] = [];

  sensorForm: FormGroup<{
    name: FormControl<string>;
    sensorEui: FormControl<string>;
    plantation: FormControl<Plantation>;
    latitude: FormControl<number>;
    longitude: FormControl<number>;
  }> = new FormGroup<{
    name: FormControl<string>;
    sensorEui: FormControl<string>;
    plantation: FormControl<Plantation>;
    latitude: FormControl<number>;
    longitude: FormControl<number>;
  }>({
    name: new FormControl<string>(null, Validators.required),
    sensorEui: new FormControl<string>(null, Validators.required),
    plantation: new FormControl<Plantation>(null, Validators.required),
    latitude: new FormControl<number>(null, Validators.required),
    longitude: new FormControl<number>(null, Validators.required),
  });

  constructor(
    private sensorService: SensorService,
    private plantationService: PlantationService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.fillPlantationDropdownOptions();
    const sub1 = this.sensorService.createSensorDialogOpen$.subscribe(
      (plantationId) => {
        this.isEdit = false;
        this.title = 'Novo Sensor';
        this.sensorForm.controls.sensorEui.enable();
        this.sensorForm.controls.plantation.enable();

        if (plantationId) {
          this.sensorForm.controls.plantation.setValue(
            this.plantationOptions.find(
              (plantation) => plantationId == plantation.id
            )
          );
          this.sensorForm.controls.plantation.disable();
        }
        this.showDialog();
      }
    );
    const sub2 = this.sensorService.editSensorDialogOpen$.subscribe(
      (sensor) => {
        this.isEdit = true;
        this.title = 'Editar Sensor';
        this.sensorEditId = sensor.deviceEui;
        this.sensorForm.setValue({
          name: sensor.name,
          sensorEui: sensor.deviceEui,
          plantation: this.plantationOptions.find(
            (plantation) => sensor.plantation.id == plantation.id
          ),
          latitude: sensor.latitude,
          longitude: sensor.longitude,
        });
        this.sensorForm.controls.sensorEui.disable();
        this.sensorForm.controls.plantation.disable();

        this.showDialog();
      }
    );
    const sub3 = this.sensorService.dialogClosed$.subscribe(() =>
      this.hideDialog()
    );

    const sub4 = this.mapService.rightClickLatLngInPolygon$.subscribe(
      (coordinate: { latitude: number; longitude: number }) => {
        this.sensorForm.controls.latitude.setValue(coordinate.latitude);
        this.sensorForm.controls.longitude.setValue(coordinate.longitude);
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
    sensor.deviceEui = formValue.sensorEui;
    sensor.plantationId = this.sensorForm.controls.plantation.value.id; // value of the disabled control
    sensor.latitude = formValue.latitude;
    sensor.longitude = formValue.longitude;

    if (this.isEdit) {
      sensor.deviceEui = this.sensorEditId;
      this.sensorService.editSensor(sensor);
      return;
    }
    this.sensorService.createSensor(sensor);
  }

  private fillPlantationDropdownOptions(): void {
    this.plantationService.fetchPlantations();
    const sub = this.plantationService.plantationsListChanged$.subscribe(
      (plantations) => (this.plantationOptions = plantations)
    );
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
