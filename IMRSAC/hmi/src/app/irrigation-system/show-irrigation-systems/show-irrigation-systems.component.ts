import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { IrrigationSystem } from '../../models/irrigation-system/irrigation-system.model';
import { Subscription } from 'rxjs';
import { IrrigationSystemService } from '../../services/irrigation-system/irrigation-system.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  imports: [CommonModule, DialogModule, DataViewModule, ButtonModule],
  standalone: true,
  selector: 'app-show-irrigation-systems',
  templateUrl: './show-irrigation-systems.component.html',
  styleUrl: './show-irrigation-systems.component.css',
})
export class ShowIrrigationSystemComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  systems: IrrigationSystem[] = [];
  visible: boolean = false;

  constructor(
    private irrigationSystemService: IrrigationSystemService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let sub =
      this.irrigationSystemService.irrigationSystemsListChanged$.subscribe(
        (systems) => (this.systems = systems)
      );
    this.subscriptions.push(sub);
    sub =
      this.irrigationSystemService.showIrrigationSystemsDialogOpen$.subscribe(
        (isOpen) => (this.visible = isOpen)
      );
    this.subscriptions.push(sub);
    this.irrigationSystemService.fetchIrrigationSystems();
  }

  deleteSystem(systemId: number): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão do sistema de irrigação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () =>
        this.irrigationSystemService.deleteIrrigationSystem(systemId),
      reject: () => this.confirmationService.close(),
    });
  }

  editSystem(system: IrrigationSystem): void {
    this.irrigationSystemService.openEditIrrigationSystemDialog(system);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
