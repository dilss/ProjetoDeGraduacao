import { Injectable, Injector } from '@angular/core';
import {
  createCustomElement,
  NgElement,
  WithProperties,
} from '@angular/elements';
import { LatLng, LeafletMouseEvent, Polygon, Popup } from 'leaflet';
import { PlantationMenuComponent } from '../../plantation/plantation-menu/plantation-menu.component';
import { AreaMenuComponent } from '../../area/area-menu/area-menu.component';
import { Area } from '../../models/area/area.model';
import { Coordinate } from '../../models/area/coordinate.model';
import { AreaService } from '../area/area.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  rightClickLatLngInPolygon$: Subject<{ latitude: number; longitude: number }> =
    new Subject<{ latitude: number; longitude: number }>();
  constructor(injector: Injector, private areaService: AreaService) {
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
        color = 'brown';
      }
      if (area.plantation) {
        color = 'green';
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
}
