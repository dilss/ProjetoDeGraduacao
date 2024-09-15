import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { AreaService } from '../../services/area/area.service';
import { Area } from '../../models/area/area.model';
import { MapService } from '../../services/map/map.service';

@Component({
  imports: [CommonModule, DialogModule, DataViewModule, ButtonModule],
  standalone: true,
  selector: 'app-show-areas',
  templateUrl: './show-areas.component.html',
  styleUrl: './show-areas.component.css',
})
export class ShowAreasComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  areas: Area[] = [];
  visible: boolean = false;

  constructor(
    private areaService: AreaService,
    private mapService: MapService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let sub = this.areaService.areasListChanged$.subscribe(
      (areas) => (this.areas = areas)
    );
    this.subscriptions.push(sub);
    sub = this.areaService.showAreasDialogOpen$.subscribe(
      (isOpen) => (this.visible = isOpen)
    );
    this.subscriptions.push(sub);
    this.areaService.fetchAreas();
  }

  editArea(area: Area): void {
    this.visible = false;
    this.areaService.openEditArea(area.id);
  }

  deleteArea(areaId: number): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão da área?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.areaService.deleteArea(areaId),
      reject: () => this.confirmationService.close(),
    });
  }

  focusAreaOnTheMap(area: Area): void {
    this.visible = false;
    this.mapService.focusAreaOnMap(area.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  areaInHectares(area: number): string {
    return (area/10000).toFixed(2);
  }
}
