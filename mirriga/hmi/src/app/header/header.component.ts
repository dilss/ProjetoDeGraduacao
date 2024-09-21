import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CrossCommunicationService } from '../services/cross-communication.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';

@Component({
  imports: [
    ButtonModule,
    FontAwesomeModule,
    AvatarModule,
    OverlayPanelModule,
    MenuModule,
  ],
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  stylesRecord: Record<string, string>;
  readonly menuItems: MenuItem[] = [
    {
      label: 'Menu do usuário',
      items: [
        {
          label: 'Notificações',
          icon: PrimeIcons.BELL,
          command: () => {},
        },
        {
          label: 'Configurações',
          icon: PrimeIcons.COG,
          command: () => {},
        },
        {
          separator: true,
        },
        {
          label: 'Sair',
          icon: PrimeIcons.SIGN_OUT,
          command: () => this.logout(),
        },
      ],
    },
  ];
  togleIcon: IconDefinition = faBars;

  constructor(
    private crossCommunicationService: CrossCommunicationService,
    private keycloakService: KeycloakService
  ) {
    this.stylesRecord = { color: 'white' };
  }

  toggleSideMenu(): void {
    this.crossCommunicationService.toggleSideMenu();
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
