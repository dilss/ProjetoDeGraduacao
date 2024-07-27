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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';
import { Coordinate } from '../../models/area/coordinate.model';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private readonly baseUrl: String = 'http://localhost:8080/api/areas';

  private areas: Area[] = [];

  areasListChanged$: Subject<Area[]> = new Subject<Area[]>();

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

  get areasList() {
    return [...this.areas];
  }

  drawAreas(): Polygon[] {
    return this.areas.map((area) => {
      let color: string = 'grey';
      if (area.soil) {
        color = 'brown';
      }
      if (area.plantation) {
        color = 'green'
      }
      let polygon: Polygon = new Polygon(
        this.getLatLongFromAreaCoordinates(area),
        { fillColor: color, color: color, fillOpacity: 0.6 }
      )
        .bindPopup(new Popup(), { interactive: true })
        .bindTooltip(area.name)
        .clearAllEventListeners()
        .addEventListener('contextmenu', (event: LeafletMouseEvent) => {
          const areaMenuElement: NgElement & WithProperties<AreaMenuComponent> =
            document.createElement('area-menu-element') as any;
          areaMenuElement.setAttribute('id', area.id.toString());
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
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse?.error?.message),
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
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse?.error?.message),
      });
  }

  editArea(area: Area): void {
    this.http
      .put(`${this.baseUrl}/${area.id}`, area, { responseType: 'json' })
      .subscribe({
        next: () => {
          this.router.navigate(['home']);
          this.fetchAreas();
          this.toastService.showSuccess(
            `A área "${area.name}" foi atualizada com sucesso.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse?.error?.message),
      });
  }

  deleteArea(areaId: number): void {
    // Procurar porque o find com === não funciona
    const area: Area = this.areas.find((area) => area.id == areaId);
    this.http.delete(`${this.baseUrl}/${areaId}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchAreas();
        this.toastService.showSuccess(
          `A área "${area.name}" foi removida com sucesso.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse?.error?.message),
    });
  }

  openEditArea(areaId: number): void {
    this.router.navigate(['edit-area', areaId]);
  }

  private getLatLongFromAreaCoordinates(area: Area): Array<LatLng> {
    const sortedCordinates: Coordinate[] = area.coordinates.sort(
      (a, b) => b.nodeOrder - a.nodeOrder
    );
    return sortedCordinates.map(
      (point) => new LatLng(point.latitude, point.longitude)
    );
  }
}
