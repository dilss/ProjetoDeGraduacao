import { Injectable } from '@angular/core';
import { Area } from '../../models/area.model';
import { LatLng, LeafletMouseEvent, Polygon } from 'leaflet';
import { AreaMenuDirective } from '../../area/area-menu/area-menu.directive';
import { AreaMenuComponent } from '../../area/area-menu/area-menu.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private areas: Area[] = [
    {
      name: 'Área Teste',
      points: [
        { latitude: -23.01082457568464, longitude: -45.58001532145514 },
        { latitude: -23.011684034982196, longitude: -45.57952137576746 },
        { latitude: -23.010980275238868, longitude: -45.577408009971315 },
        { latitude: -23.01022461172214, longitude: -45.57812524617534 },
      ],
    },
    {
      name: 'Área ao lado da área teste',
      points: [
        { latitude: -23.010197983178035, longitude: -45.57976592565331 },
        { latitude: -23.01060533452893, longitude: -45.579696188224624 },
        { latitude: -23.009980728621294, longitude: -45.57776768010066 },
        { latitude: -23.009565968950607, longitude: -45.577920566002 },
      ],
    },
  ];

  areasListChanged$: Subject<Area[]> = new Subject<Area[]>();

  getAreas(areaMenu: AreaMenuDirective): Polygon[] {
    return this.areas.map((area) => {
      let polygon: Polygon = new Polygon(
        this.getLatLongFromAreaCoordinates(area)
      )
        .bindPopup(this.buildAreaMenuComponent(areaMenu, area), { interactive: true })
        .bindTooltip(area.name)
        .clearAllEventListeners()
        .addEventListener('contextmenu', (event: LeafletMouseEvent) =>
          polygon.openPopup(event.latlng)
        )
        .addEventListener('click', (event: LeafletMouseEvent) =>
          polygon.openTooltip(event.latlng)
        );
        // .addEventListener('remove', (_event) => polygon.closePopup()); // close with event from the polygon on which the popup is on
        polygon.getPopup().addEventListener('mouseup', _event => polygon.closePopup()); // Close with event from the popup itself
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

  private buildAreaMenuComponent(
    areaMenu: AreaMenuDirective,
    area: Area
  ): HTMLElement {
    const areaMenuViewContanerRef = areaMenu.viewContainerRef;
    let component = areaMenuViewContanerRef.createComponent(AreaMenuComponent);
    component.instance.title = area.name;
    let element: HTMLElement = component.location.nativeElement;
    return element;
  }
}
