import { Injectable } from '@angular/core';
import { Plantation } from '../../models/plantation/plantation.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { AreaService } from '../area/area.service';

@Injectable({
  providedIn: 'root',
})
export class PlantationService {
  private readonly baseUrl: String = 'http://localhost:8080/api/plantations';

  private plantations: Plantation[] = [];

  plantationsListChanged$: Subject<Plantation[]> = new Subject<Plantation[]>();

  createPlantationDialogOpen$: Subject<void> = new Subject();

  editPlantationDialogOpen$: Subject<Plantation> = new Subject<Plantation>();

  showPlantationsDialogOpen$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  dialogClosed$: Subject<void> = new Subject<void>();

  get plantationsList() {
    return [...this.plantations];
  }

  constructor(
    private http: HttpClient,
    private areaService: AreaService,
    private toastService: ToastService
  ) {}

  fetchPlantations(): void {
    this.http
      .get<Plantation[]>(`${this.baseUrl}`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: Plantation[]) => {
          this.plantations = [...responseData];
          this.plantationsListChanged$.next([...this.plantations]);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  createPlantation(plantation: Plantation): void {
    this.http
      .post(
        `${this.baseUrl}`,
        {
          name: plantation.name,
          areaId: plantation.area.id,
          agriculturalCropId: plantation.agriculturalCrop.id,
          irrigationSystemId: plantation.irrigationSystem.id,
        },
        { responseType: 'json' }
      )
      .subscribe({
        next: (_plantationId: number) => {
          this.fetchPlantations();
          this.areaService.fetchAreas();
          this.closeDialog();
          this.toastService.showSuccess(
            `A nova plantação "${plantation.name}" foi criada.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  editPlantation(plantation: Plantation): void {
    this.http
      .put(
        `${this.baseUrl}/${plantation.id}`,
        {
          id: plantation.id,
          name: plantation.name,
          areaId: plantation.area.id,
          agriculturalCropId: plantation.agriculturalCrop.id,
          irrigationSystemId: plantation.irrigationSystem.id,
        },
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (_plantationId: number) => {
          this.fetchPlantations();
          this.areaService.fetchAreas();
          this.closeDialog();
          this.toastService.showSuccess(
            `As alterações na plantação "${plantation.name}" foram salvas.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  deletePlantation(plantationId: number): void {
    let plantation = this.plantations.find(
      (plantation) => plantation.id === plantationId
    );
    this.http.delete(`${this.baseUrl}/${plantationId}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchPlantations();
        this.areaService.fetchAreas();
        this.toastService.showSuccess(
          `A plantação "${plantation.name}" foi excluída.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse.error.message),
    });
  }

  openEditPlantationDialog(plantation: Plantation): void {
    this.editPlantationDialogOpen$.next(plantation);
  }

  openEditPlantationWithId(plantationId: number): void {
    let plantation: Plantation = this.plantations.find(
      (plantation) => (plantation.id == plantationId)
    );
    this.editPlantationDialogOpen$.next(plantation);
  }

  openCreatePlantationDialog(): void {
    this.createPlantationDialogOpen$.next();
  }

  openShowPlantationsDialog(): void {
    this.showPlantationsDialogOpen$.next(true);
  }

  closeDialog(): void {
    this.dialogClosed$.next();
  }
}
