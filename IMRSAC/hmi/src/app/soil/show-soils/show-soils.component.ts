import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { SoilService } from '../../services/soil/soil.service';
import { Subscription } from 'rxjs';
import { Soil } from '../../models/soil/soil.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

@Component({
  imports: [CommonModule, DialogModule, DataViewModule, ButtonModule],
  standalone: true,
  selector: 'app-show-soils',
  templateUrl: './show-soils.component.html',
  styleUrl: './show-soils.component.css',
})
export class ShowSoilsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  soils: Soil[] = [];
  visible: boolean = false;

  constructor(
    private soilService: SoilService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let sub = this.soilService.soilsListChanged$.subscribe(
      (soils) => (this.soils = soils)
    );
    this.subscriptions.push(sub);
    sub = this.soilService.showSoilsDialogOpen$.subscribe(
      (isOpen) => (this.visible = isOpen)
    );
    this.subscriptions.push(sub);
    this.soilService.fetchSoils();
  }

  deleteSoil(soilId: number): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do solo?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.soilService.deleteSoil(soilId);
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }

  editSoil(soil: Soil): void {
    this.soilService.openEditSoilDialog(soil);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
