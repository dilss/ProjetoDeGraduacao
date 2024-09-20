import { Injectable, Injector } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class MapService {
  rightClickLatLngInPolygon$: Subject<{ latitude: number; longitude: number }> =
    new Subject<{ latitude: number; longitude: number }>();

  elementToFocusOnMap$: Subject<LatLngBounds> = new Subject<LatLngBounds>();

  readonly NEW_AREA_COLOR: string = 'grey';
  readonly AREA_WITH_SOIL_ONLY_COLOR: string = '#926829';
  readonly AREA_WITH_PLANATATION_COLOR: string = '#228B22';
  readonly NO_NETWORK_KEY_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-no-network-key.png';
  readonly NEVER_SEEN_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-warning.png';
  readonly OFFLINE_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-unhealthy.png';
  readonly HEALTHY_SENSOR_ICON: string =
    '../../assets/images/icons/sensor-marker/metering-healthy.png';

  constructor(
    injector: Injector,
    private areaService: AreaService,
    private sensorService: SensorService
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
    customElements.define('plantation-menu-element', PlantationMenuElement);
    customElements.define('area-menu-element', AreaMenuElement);
    customElements.define('sensor-menu-element', SensorMenuElement);
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
        .bindPopup(new Popup(), { interactive: true })
        .bindTooltip(area.name)
        .clearAllEventListeners()
        .addEventListener('contextmenu', (event: LeafletMouseEvent) => {
          this.updateRightClickedLatLngOverPoligon(event);
          this.areaContextMenuPopup(event, polygon, area);
        })
        .addEventListener('click', (event: LeafletMouseEvent) =>
          polygon.openTooltip(event.latlng)
        );
      polygon
        .getPopup()
        .addEventListener('mouseup', (_event) => polygon.closePopup()); // Close with event from the popup itself
      return polygon;
    });
  }

  public getSensorsMarkers(): Marker<Sensor>[] {
    return this.sensorService.sensorsList.map((sensor) =>
      this.createMarker(sensor)
    );
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
      const plantationMenuComponent: NgElement &
        WithProperties<PlantationMenuComponent> = document.createElement(
        'plantation-menu-element'
      ) as any;
      plantationMenuComponent.setAttribute('id', area.plantation.id.toString());
      plantationMenuComponent.areaId = area.id;
      plantationMenuComponent.title = area.plantation.name;
      polygon.setPopupContent(plantationMenuComponent).openPopup(event.latlng);
    } else {
      const areaMenuElement: NgElement & WithProperties<AreaMenuComponent> =
        document.createElement('area-menu-element') as any;
      areaMenuElement.setAttribute('id', area.id.toString());
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

  private createMarker(sensor: Sensor): Marker<Sensor> {
    let icon: Icon = new Icon({
      iconUrl: this.defineMarkerIcon(sensor),
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
      document.createElement('sensor-menu-element') as any;
    sensorMenuComponent.setAttribute('id', sensor.deviceEui);
    sensorMenuComponent.sensorEui = sensor.deviceEui;
    sensorMenuComponent.title = sensor.name;
    marker.setPopupContent(sensorMenuComponent).openPopup(event.latlng);
  }

  private defineMarkerIcon(sensor: Sensor): string {
    let iconUrl = this.NO_NETWORK_KEY_SENSOR_ICON;
    if (sensor.networkKey) {
      iconUrl = this.NEVER_SEEN_SENSOR_ICON;
    }
    return iconUrl;
  }
}
