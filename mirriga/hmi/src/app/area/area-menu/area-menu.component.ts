import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AreaService } from '../../services/area/area.service';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-area-menu',
  templateUrl: './area-menu.component.html',
  styleUrl: './area-menu.component.css',
})
export class AreaMenuComponent implements OnInit {
  @Input() title: string;
  @Input() areaId: number;
  items: MenuItem[] = [];

  constructor(
    private areaService: AreaService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.items.push({
      id: this.areaId.toString(),
      label: this.title,
      items: [
        {
          label: 'Editar área',
          icon: PrimeIcons.PENCIL,
          command: () => this.editClicked(this.areaId),
        },
        {
          label: 'Excluir área',
          icon: PrimeIcons.TRASH,
          command: () => this.deleteClick(this.areaId),
        },
      ],
    });
  }

  private deleteClick(areaId: number): void {
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

  private editClicked(areaId: number): void {
    this.areaService.openEditArea(areaId);
  }
}
