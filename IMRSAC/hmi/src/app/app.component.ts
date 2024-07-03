import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from './spinner/spinner.component';
import { CreateSoilComponent } from './soil/create-soil/create-soil.component';
import { ShowSoilsComponent } from './soil/show-soils/show-soils.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  imports: [
    HeaderComponent,
    MenuComponent,
    MapComponent,
    CreateSoilComponent,
    ShowSoilsComponent,
    SpinnerComponent,
    FooterComponent,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hmi';
}
