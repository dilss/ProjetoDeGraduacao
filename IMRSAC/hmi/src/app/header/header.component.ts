import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CrossComunicationService } from '../services/cross-comunication.service';

@Component({
  imports: [ButtonModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private crossComunicationService: CrossComunicationService) {}

  toggleSideMenu(): void {
    this.crossComunicationService.toggleSideMenu();
  }
}
