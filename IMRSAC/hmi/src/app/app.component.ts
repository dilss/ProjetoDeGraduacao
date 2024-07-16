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
import { CreateAgriculturalCropComponent } from './agricultural-crop/create-agricultural-crop/create-agricultural-crop.component';
import { ShowAgriculturalCropsComponent } from './agricultural-crop/show-agricultural-crops/show-agricultural-crops.component';
import { CreateIrrigationSystemComponent } from './irrigation-system/create-irrigation-system/create-irrigation-system.component';
import { ShowIrrigationSystemComponent } from './irrigation-system/show-irrigation-systems/show-irrigation-systems.component';

@Component({
  imports: [
    HeaderComponent,
    MenuComponent,
    MapComponent,
    CreateSoilComponent,
    ShowSoilsComponent,
    CreateAgriculturalCropComponent,
    ShowAgriculturalCropsComponent,
    CreateIrrigationSystemComponent,
    ShowIrrigationSystemComponent,
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
