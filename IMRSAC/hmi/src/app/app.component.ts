import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
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
import { CreatePlantationComponent } from './plantation/create-plantation/create-plantation.component';
import { ShowPlantationsComponent } from './plantation/show-plantations/show-plantations.component';

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
    CreatePlantationComponent,
    ShowPlantationsComponent,
    SpinnerComponent,
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
