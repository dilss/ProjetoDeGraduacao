import { Component, Input, OnInit } from '@angular/core';
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
  @Input() id: string;
  items: MenuItem[] = [];

  constructor(private areaService: AreaService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.items.push({
      id: this.id,
      label: this.title,
      items: [
        { label: 'Editar área', icon: PrimeIcons.PENCIL },
        { label: 'Excluir área', icon: PrimeIcons.TRASH, command: () => this.deleteClick(this.id)},
      ],
    });
  }

  private deleteClick(id: string): void {
    this.areaService.deleteArea(parseInt(id));
  }
}
