import { Injectable, Injector } from '@angular/core';
import { LatLng, LeafletMouseEvent, Polygon, Popup } from 'leaflet';
import { AreaMenuComponent } from '../../area/area-menu/area-menu.component';
import { Subject } from 'rxjs';
import {
  NgElement,
  WithProperties,
  createCustomElement,
} from '@angular/elements';
import { Area } from '../../models/area/area.model';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private readonly baseUrl: String = 'http://localhost:8080/api/areas';

  private areas: Area[] = [];

  constructor(
    injector: Injector,
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {
    const AreaMenuElement = createCustomElement(AreaMenuComponent, {
      injector: injector,
    });
    customElements.define('area-menu-element', AreaMenuElement);
  }

  areasListChanged$: Subject<Area[]> = new Subject<Area[]>();

  drawAreas(): Polygon[] {
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
          areaMenuElement.id = area.id.toString();
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

  fetchAreas(): void {
    this.http
      .get<Area[]>(`${this.baseUrl}/list`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: Area[]) => {
          (this.areas = [...responseData]),
            this.areasListChanged$.next(this.areas);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  createArea(area: Area): void {
    this.http
      .post(`${this.baseUrl}/create`, area, { responseType: 'json' })
      .subscribe({
        next: (_areaId: number) => {
          this.router.navigate(['home']);
          this.fetchAreas();
          this.toastService.showSuccess(
            `A nova área "${area.name}" foi criada com sucesso.`
          );
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  deleteArea(areaId: number): void {
    let area: Area = this.areas.find( area => area.id === areaId);
    this.http.delete(`${this.baseUrl}/${areaId}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchAreas();
        this.toastService.showSuccess(
          `A área "${area.name}" foi removida com sucesso.`
        );
      },
      error: (error: Error) => this.toastService.showError(error.message),
    });
  }

  private getLatLongFromAreaCoordinates(area: Area): Array<LatLng> {
    return area.coordinates.map(
      (point) => new LatLng(point.latitude, point.longitude)
    );
  }
}
