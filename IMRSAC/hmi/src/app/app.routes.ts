import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CreateAreaComponent } from './area/create-area/create-area.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { title: 'Home', path: 'home', component: MapComponent },
  {
    title: 'Cadastrar Nova Área',
    path: 'create-area',
    component: CreateAreaComponent,
  },
  {
    title: 'Editar Área',
    path: 'edit-area/:areaToEditId',
    component: CreateAreaComponent,
  },
];
