import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Soil } from '../../models/soil/soil.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root',
})
export class SoilService {
  private readonly baseUrl: String = 'http://localhost:8080/api/soils';

  private soils: Soil[] = [];

  soilsListChanged$: Subject<Soil[]> = new Subject<Soil[]>();

  createSoilDialogOpen$: Subject<void> = new Subject();

  editSoilDialogOpen$: Subject<Soil> = new Subject<Soil>();

  showSoilsDialogOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private toastService: ToastService) {}

  fetchSoils(): void {
    this.http
      .get<Soil[]>(`${this.baseUrl}/list`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: Soil[]) => {
          (this.soils = [...responseData]),
            this.soilsListChanged$.next(this.soils);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  createSoil(soil: Soil): void {
    this.http
      .post(`${this.baseUrl}/create`, soil, { responseType: 'json' })
      .subscribe({
        next: (_soilId: number) => {
          this.fetchSoils();
          this.toastService.showSuccess(
            `O novo solo "${soil.name}" foi criado com sucesso.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  deleteSoil(soilId: number): void {
    let soil = this.soils.find((soil) => soil.id === soilId);
    this.http.delete(`${this.baseUrl}/${soilId}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchSoils();
        this.toastService.showSuccess(
          `O solo "${soil.name}" foi excluído com sucesso.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse.error.message),
    });
  }

  editSoil(soil: Soil): void {
    this.http
    .put(`${this.baseUrl}/${soil.id}`, soil, { responseType: 'json' })
    .subscribe({
      next: (_soilId: number) => {
        this.fetchSoils();
        this.toastService.showSuccess(
          `As altearções no solo "${soil.name}" foram salvas.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse.error.message),
    });  
  }

  openEditSoilDialog(soil: Soil): void {
    this.editSoilDialogOpen$.next(soil);
  }

  openCreateSoilDialog(): void {
    this.createSoilDialogOpen$.next();
  }

  openShowSoilsDialog(): void {
    this.showSoilsDialogOpen$.next(true);
  }
}
