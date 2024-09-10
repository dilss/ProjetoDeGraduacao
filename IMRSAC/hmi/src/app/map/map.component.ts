import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  LeafletModule,
} from '@asymmetrik/ngx-leaflet';
import { Icon, Layer, MapOptions, latLng, tileLayer } from 'leaflet';
import { AreaService } from '../services/area/area.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { SocketService } from '../services/SocketService';
import { MapService } from '../services/map/map.service';
import { SensorService } from '../services/sensor/sensor.service';

Icon.Default.imagePath = 'leaflet/';
@Component({
  imports: [LeafletModule, FooterComponent],
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

  constructor(
    private areaService: AreaService,
    private mapService: MapService,
    private sensorService: SensorService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    let sub1 = this.socketService.listen();
    let sub2 = this.areaService.areasListChanged$.subscribe((_areas) =>
      this.mapService
        .drawAreas()
        .forEach((polygon) => this.layers.push(polygon))
    );
    let sub3 = this.sensorService.sensorListChanged$.subscribe((sensors) => {
      this.mapService
        .getSensorsMarkers()
        .forEach((sensorMarker) => this.layers.push(sensorMarker));
    });
    this.areaService.fetchAreas();
    this.sensorService.fetchSensors();
    this.layers = this.mapService.drawAreas();
    this.subscriptions.push(sub1, sub2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
