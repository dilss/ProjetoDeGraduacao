import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PlantationService } from '../../services/plantation/plantation.service';
import { AreaService } from '../../services/area/area.service';
import { SensorService } from '../../services/sensor/sensor.service';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-plantation-menu',
  templateUrl: './plantation-menu.component.html',
  styleUrl: './plantation-menu.component.css',
})
export class PlantationMenuComponent implements OnInit {
  @Input() title: string;
  @Input() plantationId: number;
  @Input() areaId: number;
  items: MenuItem[] = [];

  constructor(
    private areaService: AreaService,
    private plantationService: PlantationService,
    private confirmationService: ConfirmationService,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    this.items.push({
      id: this.plantationId.toString(),
      label: `Plantação: ${this.title}`,
      items: [
        {
          label: 'Adicionar sensor',
          icon: PrimeIcons.PLUS,
          command: () => this.newSensorClicked(this.plantationId),
        },
        {
          label: 'Editar área da plantação',
          icon: PrimeIcons.PENCIL,
          command: () => this.editAreaClicked(this.areaId),
        },
        {
          label: 'Editar plantação',
          icon: PrimeIcons.PENCIL,
          command: () => this.editClicked(this.plantationId),
        },
        {
          label: 'Excluir plantação',
          icon: PrimeIcons.TRASH,
          command: () => this.deleteClick(this.plantationId),
        },
      ],
    });
  }

  private deleteClick(plantationId: number): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão da plantação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.plantationService.deletePlantation(plantationId),
      reject: () => this.confirmationService.close(),
    });
  }

  private editClicked(plantationId: number): void {
    this.plantationService.openEditPlantationWithId(plantationId);
  }

  private editAreaClicked(areaId: number): void {
    this.areaService.openEditArea(areaId);
  }

  private newSensorClicked(plantationId: number): void {
    this.sensorService.openCreateSensorDialog(plantationId);
  }
}
