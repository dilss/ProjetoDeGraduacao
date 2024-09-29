import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { AgriculturalCrop } from '../../models/agricultural-crop/agricultural-crop.model';

@Injectable({
  providedIn: 'root',
})
export class AgriculturalCropService {
  private readonly baseUrl: String =
    'http://localhost:8081/api/agricultural-crops';

  private agriculturalCrops: AgriculturalCrop[] = [];

  agriculturalCropListChanged$: Subject<AgriculturalCrop[]> = new Subject<
    AgriculturalCrop[]
  >();

  createAgriculturalCropDialogOpen$: Subject<void> = new Subject();

  editAgriculturalCropDialogOpen$: Subject<AgriculturalCrop> =
    new Subject<AgriculturalCrop>();

  showAgriculturalCropsDialogOpen$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  dialogClosed$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private toastService: ToastService) {}

  fetchAgriculturalCrops(): void {
    this.http
      .get<AgriculturalCrop[]>(`${this.baseUrl}`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: AgriculturalCrop[]) => {
          (this.agriculturalCrops = [...responseData]),
            this.agriculturalCropListChanged$.next(this.agriculturalCrops);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  createAgriculturalCrop(crop: AgriculturalCrop): void {
    this.http
      .post(`${this.baseUrl}`, crop, { responseType: 'json' })
      .subscribe({
        next: (_cropId: number) => {
          this.fetchAgriculturalCrops();
          this.closeDialog();
          this.toastService.showSuccess(
            `A nova cultura "${crop.name}" foi criada.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  deleteAgriculturalCrop(cropId: number): void {
    let crop = this.agriculturalCrops.find((crop) => crop.id === cropId);
    this.http.delete(`${this.baseUrl}/${cropId}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchAgriculturalCrops();
        this.toastService.showSuccess(
          `A cultura "${crop.name}" foi excluída.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse.error.message),
    });
  }

  editAgriculturalCrop(crop: AgriculturalCrop): void {
    this.http
      .put(`${this.baseUrl}/${crop.id}`, crop, { responseType: 'json' })
      .subscribe({
        next: (_cropId: number) => {
          this.fetchAgriculturalCrops();
          this.closeDialog();
          this.toastService.showSuccess(
            `As alterações na cultura "${crop.name}" foram salvas.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  get agriculturalCropsList() {
    return [...this.agriculturalCrops];
  }

  openEditAgriculturalCropDialog(crop: AgriculturalCrop): void {
    this.editAgriculturalCropDialogOpen$.next(crop);
  }

  openCreateAgriculturalCropDialog(): void {
    this.createAgriculturalCropDialogOpen$.next();
  }

  openShowAgriculturalCropsDialog(): void {
    this.showAgriculturalCropsDialogOpen$.next(true);
  }

  closeDialog(): void {
    this.dialogClosed$.next();
  }
}
