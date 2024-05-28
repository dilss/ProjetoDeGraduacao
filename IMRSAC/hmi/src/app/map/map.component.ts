import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Icon, Layer, MapOptions, latLng, tileLayer } from 'leaflet';
import { AreaService } from '../services/map/area.service';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';

Icon.Default.imagePath = 'leaflet/';
@Component({
  imports: [LeafletModule, ToastModule],
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, OnDestroy {
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
    this.layers = this.areaService.drawAreas();
    let sub = this.areaService.areasListChanged$.subscribe(
      (_areas) => (this.layers = this.areaService.drawAreas())
    );
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
