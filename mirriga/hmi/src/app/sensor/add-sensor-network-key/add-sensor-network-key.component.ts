import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SensorKeyService } from '../../services/sensor/sensor-keys.service';
import { SensorKeysModel } from '../../models/sensor/sensor-keys.model';
import { Sensor } from '../../models/sensor/sensor.model';

@Component({
  imports: [DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  standalone: true,
  selector: 'app-add-sensor-network-key',
  templateUrl: './add-sensor-network-key.component.html',
  styleUrl: './add-sensor-network-key.component.css',
})
export class AddSensorNetworkKeyComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  title: string = 'Adicionar Chave de Rede';
  subtitle: string = 'Forneça a chave de rede para o sensor';
  visible: boolean = false;
  sensor: Sensor;

  subscriptions: Subscription[] = [];

  nwkKeyForm: FormGroup<{
    nwkKey: FormControl<string>;
  }> = new FormGroup<{
    nwkKey: FormControl<string>;
  }>({
    nwkKey: new FormControl<string>(null, Validators.required),
  });

  constructor(
    private sensorKeyService: SensorKeyService
  ) {}

  ngOnInit(): void {
    const sub1 = this.sensorKeyService.addSensorKeysDialogOpen$.subscribe(
      (sensor: Sensor) => {
        this.isEdit = false;
        this.sensor = sensor;
        this.title = 'Adicionar Chave de Rede';
        this.subtitle = `Forneça a chave de rede para o sensor "${sensor.name}"`;
        this.showDialog();
      }
    );
    const sub2 = this.sensorKeyService.updateSensorKeysDialogOpen$.subscribe(
      (sensor: Sensor) => {
        this.isEdit = true;
        this.title = 'Atualizar Chave de Rede';
        this.subtitle = `Forneça uma nova chave de rede para o sensor "${sensor.name}"`;
        this.sensor = sensor;
        this.nwkKeyForm.setValue({
          nwkKey: sensor.networkKey,
        });
        this.showDialog();
      }
    );
    const sub3 = this.sensorKeyService.dialogClosed$.subscribe(() =>
      this.hideDialog()
    );
    this.subscriptions.push(sub1, sub2, sub3);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.sensor = null;
    this.nwkKeyForm.reset();
    this.visible = false;
  }

  onSubmit(): void {
    let sensorsKey: SensorKeysModel = {
      deviceKeys: { nwkKey: this.nwkKeyForm.value.nwkKey },
    } as SensorKeysModel;

    if (this.isEdit) {
      this.sensorKeyService.updateSensorNetworkKey(
        this.sensor.deviceEui,
        sensorsKey
      );
      return;
    }
    this.sensorKeyService.addSensorNetworkKey(
      this.sensor.deviceEui,
      sensorsKey
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
