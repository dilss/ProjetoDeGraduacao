import { MenuItem } from 'primeng/api/menuitem';
import { CrossCommunicationService } from '../cross-communication.service';
import { Injectable } from '@angular/core';
import { SoilService } from '../soil/soil.service';
import { AgriculturalCropService } from '../agricultural-crop/agricultural-crop.service';
import { IrrigationSystemService } from '../irrigation-system/irrigation-system.service';
import { PlantationService } from '../plantation/plantation.service';
import { SensorService } from '../sensor/sensor.service';
import { AreaService } from '../area/area.service';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor(
    private crossCommunicationService: CrossCommunicationService,
    private soilService: SoilService,
    private agriculturalCropService: AgriculturalCropService,
    private irrigationSystemService: IrrigationSystemService,
    private plantationService: PlantationService,
    private sensorService: SensorService,
    private areaService: AreaService
  ) {}

  public MENU_ITEMS: MenuItem[] = [
    {
      label: 'Plantações',
      items: [
        {
          label: 'Minhas plantações',
          icon: 'crop-icon',
          command: (_event) =>
            this.plantationService.openShowPlantationsDialog(),
        },
        {
          label: 'Criar plantação',
          icon: 'seeds-icon',
          command: (_event) =>
            this.plantationService.openCreatePlantationDialog(),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Irrigações',
      items: [
        {
          label: 'Últimas irrigações',
          icon: 'watering-icon',
        },
      ],
      styleClass: 'menu-label-color',
    },
    {
      separator: true,
    },
    {
      label: 'Áreas',
      items: [
        {
          label: 'Minhas áreas',
          icon: 'field-icon',
          command: (_event) => this.areaService.openShowPlantationsDialog()
          ,
        },
        {
          label: 'Cadastrar nova área',
          icon: 'new-field-icon',
          routerLink: 'create-area',
          command: (_event) => this.crossCommunicationService.toggleSideMenu(),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Sensores',
      items: [
        {
          label: 'Meus sensores',
          icon: 'soil-sensor-icon',
        },
        {
          label: 'Adicionar um novo sensor',
          icon: 'soil-moisture-sensor-icon',
          command: (_event) => this.sensorService.openCreateSensorDialog(),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Solos',
      items: [
        {
          label: 'Meus solos',
          icon: 'soil-icon',
          command: (_event) => this.soilService.openShowSoilsDialog(),
        },
        {
          label: 'Cadastrar novo tipo de solo',
          icon: 'soil-sample-icon',
          command: (_event) => this.soilService.openCreateSoilDialog(),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Culturas',
      items: [
        {
          label: 'Minhas culturas',
          icon: 'vegetables-icon',
          command: (_event) =>
            this.agriculturalCropService.openShowAgriculturalCropsDialog(),
        },
        {
          label: 'Cadastrar nova cultura',
          icon: 'growing-plant-icon',
          command: (_event) =>
            this.agriculturalCropService.openCreateAgriculturalCropDialog(),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Sistemas de Irrigação',
      items: [
        {
          label: 'Meus sistemas',
          icon: 'water-drop-icon',
          command: (_event) =>
            this.irrigationSystemService.openShowIrrigationSystemsDialog(),
        },
        {
          label: 'Cadastrar novo sistema',
          icon: 'spinkler-icon',
          command: (_event) =>
            this.irrigationSystemService.openCreateIrrigationSystemDialog(),
        },
      ],
    },
  ];
}
