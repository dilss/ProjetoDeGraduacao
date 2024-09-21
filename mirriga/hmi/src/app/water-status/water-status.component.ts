import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlantationService } from '../services/plantation/plantation.service';
import { Plantation } from '../models/plantation/plantation.model';

@Component({
  imports: [CommonModule, ProgressBarModule, CardModule],
  standalone: true,
  selector: 'app-water-status',
  templateUrl: './water-status.component.html',
  styleUrl: './water-status.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class WaterStatusComponent implements OnInit, OnDestroy {
  readonly WATER_BLUE_COLOR: string = '#0E87CC';
  subscriptions: Subscription[] = [];

  @Input() areaId: number;
  plantation: Plantation;
  currentSoilWaterContentPercentage: number = 65;
  calculatedIrrigation: number = 45;
  irrigationTime: string = '2 horas e 15 minutos'
  timestamp: string = '21 de setembro de 2024 às 11h41';
  color: string = this.WATER_BLUE_COLOR;

  constructor(private plantationService: PlantationService) {}

  ngOnInit(): void {
    this.plantation = this.plantationService.plantationsList.find(
      (plantation) => this.areaId == plantation.area.id
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
