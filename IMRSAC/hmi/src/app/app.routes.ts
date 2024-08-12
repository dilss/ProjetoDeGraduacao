import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CreateAreaComponent } from './area/create-area/create-area.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    title: 'Home',
    path: 'home',
    component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    title: 'Cadastrar Nova Área',
    path: 'create-area',
    component: CreateAreaComponent,
    canActivate: [AuthGuard],
  },
  {
    title: 'Editar Área',
    path: 'edit-area/:areaToEditId',
    component: CreateAreaComponent,
    canActivate: [AuthGuard],
  },
];
