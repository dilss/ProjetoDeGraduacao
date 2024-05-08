import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  imports: [
    HeaderComponent,
    MenuComponent,
    MapComponent,
    NbLayoutModule,
    NbSidebarModule
  ],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hmi';
}
