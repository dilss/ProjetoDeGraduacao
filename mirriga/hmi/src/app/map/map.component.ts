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
  Polygon,
  latLng,
  tileLayer,
} from 'leaflet';
import { AreaService } from '../services/area/area.service';
import { Subscription, zip } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { SocketService } from '../services/SocketService';
import { MapService } from '../services/map/map.service';
import { SensorService } from '../services/sensor/sensor.service';
import { SensorMeasurementsService } from '../services/sensor/sensor-measurements.service';
import { SensorDataTableComponent } from '../sensor/sensor-data-table/sensor-data-table.component';
import { CommonModule } from '@angular/common';
import { CrossCommunicationService } from '../services/cross-communication.service';
import { SensorDataTableSkeletonComponent } from '../sensor/sensor-data-table-skeleton/sensor-data-table-skeleton.component';
import { MirrigaSensorMarker } from '../models/mirriga-map-marker/MirrigaMapMarker';
import { SensorMeasurement } from '../models/sensor/sensor-measurements.model';

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
  readonly NO_NETWORK_KEY_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-no-network-key.png';
  readonly CRITICAL_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-critical.png';
  readonly WARNING_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-warning.png';
  readonly HEALTHY_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-healthy.png';
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

  markers: MirrigaSensorMarker[] = [];

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

    let sub3 = zip(
      this.sensorService.sensorListChanged$,
      this.sensorMeasurementsService.eachSensorMostRecentMeasurementListChanged$
    ).subscribe({
      next: (value) => {
        let x = value[0];
        let y = value[1];

        let z = x.map((sensor) => {
          let measurement = y.find((m) => sensor.deviceEui == m.deviceEui);
          if (measurement) {
            sensor.mostRecentMeasurementTimestamp = measurement.timestamp;
          }
          return sensor;
        });

        this.clearAllMarkers();
        z.forEach((sensor) => {
          let newMarker: MirrigaSensorMarker =
            this.mapService.createMirrigaMarker(sensor);
          this.markers.push(newMarker);
        });
        this.layers.push(...this.markers);
      },
    });

    let sub4 = this.sensorService.sensorListChanged$.subscribe({
      next: (_sensors) =>
        this.sensorMeasurementsService.fetchEachSensorMostRecentMeasurementList(),
    });

    let sub5 =
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

  private clearAllMarkers() {
    this.layers.forEach((layer) => {
      if (layer instanceof MirrigaSensorMarker) {
        layer.remove();
        this.markers = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
