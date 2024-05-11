import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CrossCommunicationService } from '../services/cross-communication.service';

@Component({
  imports: [ButtonModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private crossCommunicationService: CrossCommunicationService) {}

  toggleSideMenu(): void {
    this.crossCommunicationService.toggleSideMenu();
  }
}
