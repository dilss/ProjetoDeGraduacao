import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Area } from '../../models/area/area.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private readonly baseUrl: String = 'http://localhost:8081/api/areas';

  private areas: Area[] = [];

  areasListChanged$: Subject<Area[]> = new Subject<Area[]>();

  showAreasDialogOpen$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router
  ) {}

  get areasList() {
    return [...this.areas];
  }

  fetchAreas(): void {
    this.http
      .get<Area[]>(`${this.baseUrl}`, {
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
      .post(`${this.baseUrl}`, area, { responseType: 'json' })
      .subscribe({
        next: (_areaId: number) => {
          this.router.navigate(['home']);
          this.fetchAreas();
          this.toastService.showSuccess(
            `A nova área "${area.name}" foi criada.`
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
            `A área "${area.name}" foi atualizada.`
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
          `A área "${area.name}" foi removida.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse?.error?.message),
    });
  }

  openEditArea(areaId: number): void {
    this.router.navigate(['edit-area', areaId]);
  }

  openShowPlantationsDialog(): void {
    this.showAreasDialogOpen$.next(true);
  }
}
