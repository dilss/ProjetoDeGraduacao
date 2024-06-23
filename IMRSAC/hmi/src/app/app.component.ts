import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CreateSoilComponent } from './soil/create-soil.component';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  imports: [
    HeaderComponent,
    MenuComponent,
    MapComponent,
    CreateSoilComponent,
    SpinnerComponent,
    FooterComponent,
    RouterModule,
    ToastModule,
  ],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hmi';
}
