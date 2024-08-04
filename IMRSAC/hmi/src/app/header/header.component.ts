import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import { CrossCommunicationService } from '../services/cross-communication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [ButtonModule, FontAwesomeModule, AvatarModule],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  stylesRecord: Record<string, string>;

  togleIcon: IconDefinition = faBars;
  constructor(private crossCommunicationService: CrossCommunicationService) {
    this.stylesRecord = {'color': 'white'}
  }

  toggleSideMenu(): void {
    this.crossCommunicationService.toggleSideMenu();
  }
}
