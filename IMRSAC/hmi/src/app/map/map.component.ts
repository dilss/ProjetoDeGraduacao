import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Icon, Layer, MapOptions, latLng, tileLayer } from 'leaflet';
import { AreaService } from '../services/area/area.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { SocketService } from '../services/SocketService';
import { MapService } from '../services/map/map.service';

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

  constructor(private areaService: AreaService, private mapService: MapService, private socketService: SocketService) {}

  ngOnInit(): void {
    let sub1 = this.socketService.listen();
    this.areaService.fetchAreas();
    this.layers = this.mapService.drawAreas();
    let sub2 = this.areaService.areasListChanged$.subscribe(
      (_areas) => (this.layers = this.mapService.drawAreas())
    );
    this.subscriptions.push(sub1, sub2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
