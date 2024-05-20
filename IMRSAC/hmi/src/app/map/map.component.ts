import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  Icon,
  Layer,
  MapOptions,
  latLng,
  tileLayer,
} from 'leaflet';
import { AreaService } from '../services/map/area.service';
import { AreaMenuDirective } from '../area/area-menu/area-menu.directive';
import { Subscription } from 'rxjs';

Icon.Default.imagePath = 'leaflet/';
@Component({
  imports: [LeafletModule, AreaMenuDirective],
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, OnDestroy {

  @ViewChild(AreaMenuDirective, { static: true }) areaMenuHost: AreaMenuDirective;

  subscriptions: Subscription[] = [];

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&amp;copy; OpenStreetMap contributors',
      }),
    ],
    zoom: 18,
    maxZoom: 18,
    minZoom: 4,
    center: latLng([-23.010426715414685, -45.57926527454545]),
  };

  layers: Layer[] = [];

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.layers = this.areaService.getAreas(this.areaMenuHost);
    let sub = this.areaService.areasListChanged$.subscribe( _areas => this.layers = this.areaService.getAreas(this.areaMenuHost));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }
}
