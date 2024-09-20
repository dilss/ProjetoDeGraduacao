import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PlantationService } from '../services/plantation/plantation.service';
import { Plantation } from '../models/plantation/plantation.model';

@Component({
  imports: [CommonModule, DataViewModule],
  standalone: true,
  selector: 'app-water-status',
  templateUrl: './water-status.component.html',
  styleUrl: './water-status.component.css',
})
export class WaterStatusComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @Input() areaId: number;
  plantation: Plantation;

  constructor(private plantationService: PlantationService) {}

  ngOnInit(): void {
    this.plantation = this.plantationService.plantationsList.find(
      (plantation) => (this.areaId == plantation.area.id)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
