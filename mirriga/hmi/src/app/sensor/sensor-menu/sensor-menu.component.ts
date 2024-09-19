import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SensorService } from '../../services/sensor/sensor.service';

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

  constructor(
    private sensorService: SensorService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.items.push({
      id: this.sensorEui,
      label: `Sensor: ${this.title}`,
      items: [
        {
          label: 'Editar dados do sensor',
          icon: PrimeIcons.PENCIL,
          command: () => this.editClicked(this.sensorEui),
        },
        {
          label: 'Excluir sensor',
          icon: PrimeIcons.TRASH,
          command: () => this.deleteClick(this.sensorEui),
        },
      ],
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
