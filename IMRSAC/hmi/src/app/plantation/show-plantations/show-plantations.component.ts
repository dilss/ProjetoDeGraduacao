import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { PlantationService } from '../../services/plantation/plantation.service';
import { Plantation } from '../../models/plantation/plantation.model';

@Component({
  imports: [CommonModule, DialogModule, DataViewModule, ButtonModule],
  standalone: true,
  selector: 'app-show-plantations',
  templateUrl: './show-plantations.component.html',
  styleUrl: './show-plantations.component.css',
})
export class ShowPlantationsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  plantations: Plantation[] = [];
  visible: boolean = false;

  constructor(
    private plantationService: PlantationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let sub = this.plantationService.plantationsListChanged$.subscribe(
      (plantations) => (this.plantations = plantations)
    );
    this.subscriptions.push(sub);
    sub = this.plantationService.showPlantationsDialogOpen$.subscribe(
      (isOpen) => (this.visible = isOpen)
    );
    this.subscriptions.push(sub);
    this.plantationService.fetchPlantations();
  }

  deletePlantation(plantationId: number): void {
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

  editPlantation(plantation: Plantation): void {
    this.plantationService.openEditPlantationDialog(plantation);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
