import { Injectable, Injector } from '@angular/core';
import { Area } from '../../models/area.model';
import { LatLng, LeafletMouseEvent, Polygon, Popup } from 'leaflet';
import { AreaMenuComponent } from '../../area/area-menu/area-menu.component';
import { Subject } from 'rxjs';
import {
  NgElement,
  WithProperties,
  createCustomElement,
} from '@angular/elements';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private areas: Area[] = [
    {
      id: 'area1',
      name: 'Área Teste',
      points: [
        { latitude: -23.01082457568464, longitude: -45.58001532145514 },
        { latitude: -23.011684034982196, longitude: -45.57952137576746 },
        { latitude: -23.010980275238868, longitude: -45.577408009971315 },
        { latitude: -23.01022461172214, longitude: -45.57812524617534 },
      ],
    },
    {
      id: 'area2',
      name: 'Área ao lado da área teste',
      points: [
        { latitude: -23.010197983178035, longitude: -45.57976592565331 },
        { latitude: -23.01060533452893, longitude: -45.579696188224624 },
        { latitude: -23.009980728621294, longitude: -45.57776768010066 },
        { latitude: -23.009565968950607, longitude: -45.577920566002 },
      ],
    },
  ];

  constructor(injector: Injector) {
    const AreaMenuElement = createCustomElement(AreaMenuComponent, {
      injector: injector,
    });
    customElements.define('area-menu-element', AreaMenuElement);
  }

  areasListChanged$: Subject<Area[]> = new Subject<Area[]>();

  getAreas(): Polygon[] {
    return this.areas.map((area) => {
      let polygon: Polygon = new Polygon(
        this.getLatLongFromAreaCoordinates(area)
      )
        .bindPopup(new Popup(), { interactive: true })
        .bindTooltip(area.name)
        .clearAllEventListeners()
        .addEventListener('contextmenu', (event: LeafletMouseEvent) => {
          const areaMenuElement: NgElement & WithProperties<AreaMenuComponent> =
            document.createElement('area-menu-element') as any;
          areaMenuElement.title = area.name;
          polygon.setPopupContent(areaMenuElement).openPopup(event.latlng);
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

  deleteArea(areaName: string): void {
    let index = this.areas.findIndex((area) => area.name === areaName);
    this.areas.splice(index, 1);
    this.areasListChanged$.next(this.areas.slice());
  }

  private getLatLongFromAreaCoordinates(area: Area): Array<LatLng> {
    return area.points.map(
      (point) => new LatLng(point.latitude, point.longitude)
    );
  }
}
