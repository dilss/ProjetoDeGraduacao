import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { MapComponent } from './map/map.component';

@Component({
  imports: [
    HeaderComponent,
    MapComponent,
    NbLayoutModule,
    NbSidebarModule,
  ],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hmi';
}
