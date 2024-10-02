import { ElementRef, Injectable, Injector, ViewChild } from '@angular/core';
import {
  createCustomElement,
  NgElement,
  WithProperties,
} from '@angular/elements';
import {
  Icon,
  LatLng,
  LatLngBounds,
  LatLngBoundsLiteral,
  LeafletMouseEvent,
  Marker,
  Polygon,
  Popup,
} from 'leaflet';
import { PlantationMenuComponent } from '../../plantation/plantation-menu/plantation-menu.component';
import { AreaMenuComponent } from '../../area/area-menu/area-menu.component';
import { Area } from '../../models/area/area.model';
import { Coordinate } from '../../models/area/coordinate.model';
import { AreaService } from '../area/area.service';
import { Subject } from 'rxjs';
import { Sensor } from '../../models/sensor/sensor.model';
import { SensorService } from '../sensor/sensor.service';
import { SensorMenuComponent } from '../../sensor/sensor-menu/sensor-menu.component';
import { WaterStatusComponent } from '../../water-status/water-status.component';
import { SensorMeasurementsService } from '../sensor/sensor-measurements.service';
import { SensorMeasurement } from '../../models/sensor/sensor-measurements.model';
import { CrossCommunicationService } from '../cross-communication.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  rightClickLatLngInPolygon$: Subject<{ latitude: number; longitude: number }> =
    new Subject<{ latitude: number; longitude: number }>();

  elementToFocusOnMap$: Subject<LatLngBounds> = new Subject<LatLngBounds>();

  navigateToDataTableSection$: Subject<void> = new Subject<void>();

  readonly NEW_AREA_COLOR: string = 'grey';
  readonly AREA_WITH_SOIL_ONLY_COLOR: string = '#926829';
  readonly AREA_WITH_PLANATATION_COLOR: string = '#228B22';
  readonly NO_NETWORK_KEY_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-no-network-key.png';
  readonly CRITICAL_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-critical.png';
  readonly WARNING_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-warning.png';
  readonly HEALTHY_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-healthy.png';

  constructor(
    injector: Injector,
    private areaService: AreaService,
    private sensorService: SensorService,
    private sensorMeasurementsService: SensorMeasurementsService,
    private crossCommunicationService: CrossCommunicationService
  ) {
    const AreaMenuElement = createCustomElement(AreaMenuComponent, {
      injector: injector,
    });
    const PlantationMenuElement = createCustomElement(PlantationMenuComponent, {
      injector: injector,
    });
    const SensorMenuElement = createCustomElement(SensorMenuComponent, {
      injector: injector,
    });

    const WaterStatusElement = createCustomElement(WaterStatusComponent, {
      injector: injector,
    });
    customElements.define('plantation-menu-element', PlantationMenuElement);
    customElements.define('area-menu-element', AreaMenuElement);
    customElements.define('sensor-menu-element', SensorMenuElement);
    customElements.define('water-status-element', WaterStatusElement);
  }

  drawAreas(): Polygon[] {
    return this.areaService.areasList.map((area) => {
      let color: string = this.NEW_AREA_COLOR;
      if (area.soil) {
        color = this.AREA_WITH_SOIL_ONLY_COLOR;
      }
      if (area.plantation) {
        color = this.AREA_WITH_PLANATATION_COLOR;
      }
      let polygon: Polygon = new Polygon(
        this.getLatLongFromAreaCoordinates(area),
        { fillColor: color, color: color, fillOpacity: 0.6 }
      )
        .bindPopup(new Popup({ maxWidth: 800 }), { interactive: true })
        .bindTooltip(area.name)
        .clearAllEventListeners()
        .addEventListener('contextmenu', (event: LeafletMouseEvent) => {
          this.updateRightClickedLatLngOverPoligon(event);
          this.areaContextMenuPopup(event, polygon, area);
        })
        .addEventListener('click', (event: LeafletMouseEvent) =>
          this.areaLeftClickPopup(event, polygon, area)
        );
      polygon
        .getPopup()
        .addEventListener('mouseup', (_event) => polygon.closePopup()); // Close with event from the popup itself
      return polygon;
    });
  }

  public getSensorsMarkers(): Marker<Sensor>[] {
    return this.sensorService.sensorsList.map((sensor) => {
      let measurement = this.sensorMeasurementsService
        .getSensorsMostRecentMeasurements()
        .find((measurement) => sensor.deviceEui == measurement?.deviceEui);
        console.log(measurement)
      return this.createMarker(sensor, measurement);
    });
  }

  public focusAreaOnMap(areaId: number): void {
    let area: Area = this.areaService.areasList.find(
      (area) => areaId == area.id
    );
    let latLngs: LatLngBoundsLiteral = [];
    area.coordinates.map((coordinate) =>
      latLngs.push([coordinate.latitude, coordinate.longitude])
    );
    this.elementToFocusOnMap$.next(new LatLngBounds(latLngs));
  }

  public focusSensorOnMap(sensor: Sensor): void {
    let latLngs: LatLngBoundsLiteral = [];

    latLngs.push([sensor.latitude, sensor.longitude]);
    this.elementToFocusOnMap$.next(new LatLngBounds(latLngs));
  }

  private getLatLongFromAreaCoordinates(area: Area): Array<LatLng> {
    const sortedCordinates: Coordinate[] = area.coordinates.sort(
      (a, b) => b.nodeOrder - a.nodeOrder
    );
    return sortedCordinates.map(
      (point) => new LatLng(point.latitude, point.longitude)
    );
  }

  private areaContextMenuPopup(
    event: LeafletMouseEvent,
    polygon: Polygon,
    area: Area
  ): void {
    if (area.plantation) {
      const plantationMenuElement: NgElement &
        WithProperties<PlantationMenuComponent> = document.createElement(
        'plantation-menu-element'
      ) as NgElement & WithProperties<PlantationMenuComponent>;
      plantationMenuElement.setAttribute(
        'id',
        `plantation-menu-"${area.plantation.id}"`
      );
      plantationMenuElement.areaId = area.id;
      plantationMenuElement.plantationId = area.plantation.id;
      plantationMenuElement.title = area.plantation.name;
      polygon.setPopupContent(plantationMenuElement).openPopup(event.latlng);
    } else {
      const areaMenuElement: NgElement & WithProperties<AreaMenuComponent> =
        document.createElement('area-menu-element') as NgElement &
          WithProperties<AreaMenuComponent>;
      areaMenuElement.setAttribute('id', `area-menu-${area.id}`);
      areaMenuElement.areaId = area.id;
      areaMenuElement.title = area.name;
      polygon.setPopupContent(areaMenuElement).openPopup(event.latlng);
    }
  }

  private updateRightClickedLatLngOverPoligon(event: LeafletMouseEvent) {
    this.rightClickLatLngInPolygon$.next({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  }

  private areaLeftClickPopup(
    event: LeafletMouseEvent,
    polygon: Polygon,
    area: Area
  ) {
    if (area.plantation) {
      const waterStatusElement: NgElement &
        WithProperties<WaterStatusComponent> = document.createElement(
        'water-status-element'
      ) as NgElement & WithProperties<WaterStatusComponent>;
      waterStatusElement.setAttribute(
        'id',
        `water-status-${area.plantation.id}`
      );
      waterStatusElement.areaId = area.id;
      waterStatusElement.title = area.plantation.name;
      polygon.setPopupContent(waterStatusElement).openPopup(event.latlng);
    } else {
      polygon.openTooltip(event.latlng);
    }
  }

  private createMarker(
    sensor: Sensor,
    mostRecentMeasurement: SensorMeasurement
  ): Marker<Sensor> {
    let icon: Icon = new Icon({
      iconUrl: this.defineMarkerIcon(sensor, mostRecentMeasurement),
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });
    let marker: Marker<Sensor> = new Marker<Sensor>(
      new LatLng(sensor.latitude, sensor.longitude),
      { icon: icon, title: sensor.name }
    )
      .bindPopup(new Popup(), { interactive: true })
      .clearAllEventListeners()
      .addEventListener('contextmenu', (event: LeafletMouseEvent) => {
        this.sensorContextMenuPopup(event, marker, sensor);
      })
      .addEventListener('click', (_event: LeafletMouseEvent) => {
        this.sensorOnLeftClick(sensor);
      });
    marker
      .getPopup()
      .addEventListener('mouseup', (_event) => marker.closePopup());
    return marker;
  }

  private sensorContextMenuPopup(
    event: LeafletMouseEvent,
    marker: Marker<Sensor>,
    sensor: Sensor
  ): void {
    const sensorMenuComponent: NgElement & WithProperties<SensorMenuComponent> =
      document.createElement('sensor-menu-element') as NgElement &
        WithProperties<SensorMenuComponent>;
    sensorMenuComponent.setAttribute('id', `sensor-menu-${sensor.deviceEui}`);
    sensorMenuComponent.sensorEui = sensor.deviceEui;
    sensorMenuComponent.title = sensor.name;
    marker.setPopupContent(sensorMenuComponent).openPopup(event.latlng);
  }

  private defineMarkerIcon(
    sensor: Sensor,
    mostRecentMeasurement: SensorMeasurement
  ): string {
    let iconUrl = this.NO_NETWORK_KEY_SENSOR_ICON;

    if (sensor.networkKey) {
      iconUrl = this.CRITICAL_SENSOR_ICON;
    }

    if (!mostRecentMeasurement) {
      return iconUrl;
    }

    let date = new Date(mostRecentMeasurement?.timestamp);
    if (this.getDateMinutesAgo(10) > date.getTime()) {
      iconUrl = this.CRITICAL_SENSOR_ICON;
    }

    if (this.getDateMinutesAgo(5) > date.getTime()) {
      iconUrl = this.WARNING_SENSOR_ICON;
    } else {
      iconUrl = this.HEALTHY_SENSOR_ICON;
    }

    return iconUrl;
  }

  private getDateMinutesAgo(minutesAgo: number): number {
    return Date.now() - minutesAgo * 60000;
  }

  private sensorOnLeftClick(sensor: Sensor): void {
    this.navigateToDataTableSection$.next();
    this.crossCommunicationService.showTableSkeleton();
    this.sensorMeasurementsService.fetchMeasurementsFromSensorSince(
      sensor.deviceEui
    );
  }
}
