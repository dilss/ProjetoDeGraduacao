import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AreaService } from '../../services/map/area.service';
import { ToastService } from '../../services/toast.service';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-area-menu',
  templateUrl: './area-menu.component.html',
  styleUrl: './area-menu.component.css',
})
export class AreaMenuComponent implements OnInit {
  @Input() title: string;
  items: MenuItem[] = [];

  constructor(private areaService: AreaService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.items.push({
      label: this.title,
      items: [
        { label: 'Editar área', icon: PrimeIcons.PENCIL },
        { label: 'Excluir área', icon: PrimeIcons.TRASH, command: () => this.deleteClick(this.title)},
      ],
    });
  }

  private deleteClick(areaName: string): void {
    this.areaService.deleteArea(areaName);
    this.toastService.showSuccess("Área excluída com sucesso!");
  }
}
