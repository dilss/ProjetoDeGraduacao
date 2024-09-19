import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgriculturalCrop } from '../../models/agricultural-crop/agricultural-crop.model';
import { Subscription } from 'rxjs';
import { AgriculturalCropService } from '../../services/agricultural-crop/agricultural-crop.service';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  imports: [DialogModule, DataViewModule, ButtonModule, CommonModule],
  standalone: true,
  selector: 'app-show-agricultural-crops',
  templateUrl: './show-agricultural-crops.component.html',
  styleUrl: 'show-agricultural-crops.component.css',
})
export class ShowAgriculturalCropsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  crops: AgriculturalCrop[] = [];
  visible: boolean = false;

  constructor(
    private agriculturalCropService: AgriculturalCropService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let sub = this.agriculturalCropService.agriculturalCropListChanged$.subscribe(
      (crops) => (this.crops = crops)
    );
    this.subscriptions.push(sub);
    sub = this.agriculturalCropService.showAgriculturalCropsDialogOpen$.subscribe(
      (isOpen) => (this.visible = isOpen)
    );
    this.subscriptions.push(sub);
    this.agriculturalCropService.fetchAgriculturalCrops();
  }

  deleteCrop(cropId: number): void {
    this.confirmationService.confirm({
      message: 'Confirma a exclusão da cultura?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.agriculturalCropService.deleteAgriculturalCrop(cropId),
      reject: () => this.confirmationService.close(),
    });
  }

  editCrop(crop: AgriculturalCrop): void {
    this.agriculturalCropService.openEditAgriculturalCropDialog(crop);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
