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
  MarkerOptions,
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

@Injectable({
  providedIn: 'root',
})
export class MapService {
  rightClickLatLngInPolygon$: Subject<{ latitude: number; longitude: number }> =
    new Subject<{ latitude: number; longitude: number }>();

  elementToFocusOnMap$: Subject<LatLngBounds> = new Subject<LatLngBounds>();

  constructor(
    injector: Injector,
    private areaService: AreaService,
    private sensorService: SensorService
  ) {
    const AreaMenuElement = createCustomElement(AreaMenuComponent, {
      injector: injector,
    });
    const PlantationMenElement = createCustomElement(PlantationMenuComponent, {
      injector: injector,
    });
    customElements.define('plantation-menu-element', PlantationMenElement);
    customElements.define('area-menu-element', AreaMenuElement);
  }

  drawAreas(): Polygon[] {
    return this.areaService.areasList.map((area) => {
      let color: string = 'grey';
      if (area.soil) {
        color = '#926829';
      }
      if (area.plantation) {
        color = '#228B22';
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
          this.contextMenuPopup(event, polygon, area);
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

  public getSensorsMarkers(): Marker[] {
    return this.sensorService.SensorsList.map((sensor) =>
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

  private contextMenuPopup(
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

  private createMarker(sensor: Sensor): Marker {
    let icon: Icon = new Icon({
      iconUrl: '../../assets/images/icons/sensor-marker/metering-healthy.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });
    let markerOptions: MarkerOptions = { icon: icon, title: sensor.name };
    return new Marker(
      new LatLng(sensor.latitude, sensor.longitude),
      markerOptions
    );
  }
}
