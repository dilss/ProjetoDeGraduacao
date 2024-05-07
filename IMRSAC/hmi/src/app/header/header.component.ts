import { Component } from '@angular/core';
import { NbButtonModule, NbSidebarService } from '@nebular/theme';

@Component({
  imports: [NbButtonModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private sidebarService: NbSidebarService) {}

  toggle() {
    this.sidebarService.toggle();
  }
}
