import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { SensorDataTableComponent } from '../sensor/sensor-data-table/sensor-data-table.component';
import { CommonModule } from '@angular/common';
import { CrossCommunicationService } from '../services/cross-communication.service';
import { SensorDataTableSkeletonComponent } from '../sensor/sensor-data-table-skeleton/sensor-data-table-skeleton.component';

Icon.Default.imagePath = 'leaflet/';
@Component({
  imports: [
    CommonModule,
    LeafletModule,
    FooterComponent,
    SensorDataTableComponent,
    SensorDataTableSkeletonComponent,
  ],
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  tableData: { soilWaterContent: number; localDateTime: string }[] = [];
  nameCurrentSensorClikced: string = '...';

  showTableSkeleton: boolean = false;

  @ViewChild('sensorDataTable') dataTableElementRef: ElementRef;
  @ViewChild('mirrigaMap') mapElementRef: ElementRef;

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
    private socketService: SocketService,
    private crossCommunicationService: CrossCommunicationService,
    private changeDetector: ChangeDetectorRef
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

    let sub4 =
      this.sensorMeasurementsService.singleSensorMeasurementsListChanged$.subscribe(
        {
          next: (measurements) => {
            this.showTableSkeleton = false;
            this.tableData = [
              ...measurements.map((m) => {
                return {
                  soilWaterContent: m.soilWaterContent,
                  localDateTime: new Date(m.timestamp).toLocaleString(),
                };
              }),
            ];
            this.nameCurrentSensorClikced = measurements.at(0)?.sensorName;
            this.changeDetector.detectChanges();
          },
        }
      );

    let sub5 = this.sensorService.sensorListChanged$.subscribe((_sensors) => {
      this.sensorMeasurementsService.fetchEachSensorMostRecentMeasurement();
    });

    let sub6 = this.mapService.elementToFocusOnMap$.subscribe(
      (elementToFit) => (this.elementToFitOnMap = elementToFit)
    );

    let sub7 = this.crossCommunicationService.showTableSkeleton$.subscribe({
      next: (show: boolean) => (this.showTableSkeleton = show),
    });

    let sub8 = this.mapService.navigateToDataTableSection$.subscribe({
      next: () => {
        this.dataTableElementRef.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
      },
    });

    this.areaService.fetchAreas();
    this.sensorService.fetchSensors();
    this.sensorMeasurementsService.fetchEachSensorMostRecentMeasurement();
    this.layers = this.mapService.drawAreas();
    this.subscriptions.push(sub1, sub2, sub3, sub4, sub5, sub6, sub7, sub8);
  }

  closeSensorDataTable() {
    this.tableData = [];
    this.changeDetector.detectChanges();
    this.mapElementRef.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
