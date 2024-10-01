import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  Icon,
  LatLngBounds,
  Layer,
  MapOptions,
  Marker,
  Polygon,
  latLng,
  tileLayer,
} from 'leaflet';
import { AreaService } from '../services/area/area.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { SocketService } from '../services/SocketService';
import { MapService } from '../services/map/map.service';
import { SensorService } from '../services/sensor/sensor.service';
import { SensorMeasurementsService } from '../services/sensor/sensor-measurements.service';

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

  elementToFitOnMap: LatLngBounds;

  constructor(
    private areaService: AreaService,
    private mapService: MapService,
    private sensorService: SensorService,
    private sensorMeasurementsService: SensorMeasurementsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    let sub1 = this.socketService.listen();
    let sub2 = this.areaService.areasListChanged$.subscribe((_areas) => {
      this.layers.forEach((layer) => {
        if (layer instanceof Polygon) {
          layer.remove();
        }
      });
      this.mapService
        .drawAreas()
        .forEach((polygon) => this.layers.push(polygon));
    });

    let sub3 =
      this.sensorMeasurementsService.mostRecentMeasurementsListChanged$.subscribe(
        {
          next: (_value) => {
            this.layers.forEach((layer) => {
              if (layer instanceof Marker) {
                layer.remove();
              }
            });
            this.mapService
              .getSensorsMarkers()
              .forEach((sensorMarker) => this.layers.push(sensorMarker));
          },
        }
      );

    let sub4 = this.sensorService.sensorListChanged$.subscribe((_sensors) => {
      this.sensorMeasurementsService.fetchEachSensorMostRecentMeasurement();
    });

    let sub5 = this.mapService.elementToFocusOnMap$.subscribe(
      (elementToFit) => (this.elementToFitOnMap = elementToFit)
    );

    this.areaService.fetchAreas();
    this.sensorService.fetchSensors();
    this.sensorMeasurementsService.fetchEachSensorMostRecentMeasurement();
    this.layers = this.mapService.drawAreas();
    this.subscriptions.push(sub1, sub2, sub3, sub4, sub5);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
