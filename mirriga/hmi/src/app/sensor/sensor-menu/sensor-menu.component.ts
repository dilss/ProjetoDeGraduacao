import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SensorService } from '../../services/sensor/sensor.service';
import { SensorKeyService as SensorKeysService } from '../../services/sensor/sensor-keys.service';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-sensor-menu',
  templateUrl: './sensor-menu.component.html',
  styleUrl: './sensor-menu.component.css',
})
export class SensorMenuComponent implements OnInit {
  @Input() title: string;
  @Input() sensorEui: string;
  items: MenuItem[] = [];
  actionItems: MenuItem[] = [];

  constructor(
    private sensorService: SensorService,
    private sensorKeysService: SensorKeysService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.actionItems.push({
      label: 'Editar dados do sensor',
      icon: PrimeIcons.PENCIL,
      command: () => this.editClicked(this.sensorEui),
    });

    let sensor = this.sensorService.sensorsList.find(
      (sensor) => this.sensorEui == sensor.deviceEui
    );

    if (sensor && !sensor.networkKey) {
      this.actionItems.push({
        label: 'Adicionar uma chave de rede',
        icon: PrimeIcons.PLUS,
        command: () => this.sensorKeysService.openAddSensorKeysDialog(sensor),
      });
    }

    if (sensor && sensor.networkKey) {
      this.actionItems.push({
        label: 'Editar a chave de rede',
        icon: PrimeIcons.PENCIL,
        command: () =>
          this.sensorKeysService.openUpdateSensorKeysDialog(sensor),
      });
    }

    this.actionItems.push({
      label: 'Excluir sensor',
      icon: PrimeIcons.TRASH,
      command: () => this.deleteClick(this.sensorEui),
    });

    this.items.push({
      id: this.sensorEui,
      label: `Sensor: ${this.title}`,
      items: this.actionItems,
    });
  }

  private deleteClick(sensorEui: string): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do sensor',
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

  private editClicked(sensorEui: string): void {
    this.sensorService.openEditSensorWithIdDialog(sensorEui);
  }
}
