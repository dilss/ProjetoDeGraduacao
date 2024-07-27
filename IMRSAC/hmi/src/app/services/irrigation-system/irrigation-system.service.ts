import { Injectable } from '@angular/core';
import { IrrigationSystem } from '../../models/irrigation-system/irrigation-system.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root',
})
export class IrrigationSystemService {
  private readonly baseUrl: String =
    'http://localhost:8080/api/irrigation-systems';

  private irrigationSystems: IrrigationSystem[] = [];

  irrigationSystemsListChanged$: Subject<IrrigationSystem[]> = new Subject<
    IrrigationSystem[]
  >();

  createIrrigationSystemDialogOpen$: Subject<void> = new Subject();

  editIrrigationSystemDialogOpen$: Subject<IrrigationSystem> =
    new Subject<IrrigationSystem>();

  showIrrigationSystemsDialogOpen$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private toastService: ToastService) {}

  fetchIrrigationSystems(): void {
    this.http
      .get<IrrigationSystem[]>(`${this.baseUrl}/list`, {
        responseType: 'json',
      })
      .subscribe({
        next: (responseData: IrrigationSystem[]) => {
          (this.irrigationSystems = [...responseData]),
            this.irrigationSystemsListChanged$.next(this.irrigationSystems);
        },
        error: (error: Error) => this.toastService.showError(error.message),
      });
  }

  createIrrigationSystem(system: IrrigationSystem): void {
    this.http
      .post(`${this.baseUrl}/create`, system, { responseType: 'json' })
      .subscribe({
        next: (_systemId: number) => {
          this.fetchIrrigationSystems();
          this.toastService.showSuccess(
            `O novo sistema de irrigação "${system.name}" foi criado com sucesso.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  editIrrigationSystem(system: IrrigationSystem): void {
    this.http
      .put(`${this.baseUrl}/${system.id}`, system, { responseType: 'json' })
      .subscribe({
        next: (_systemId: number) => {
          this.fetchIrrigationSystems();
          this.toastService.showSuccess(
            `As altearções no sistema de irrigação "${system.name}" foram salvas.`
          );
        },
        error: (errorResponse: HttpErrorResponse) =>
          this.toastService.showError(errorResponse.error.message),
      });
  }

  deleteIrrigationSystem(systemId: number): void {
    let system = this.irrigationSystems.find(
      (system) => system.id === systemId
    );
    this.http.delete(`${this.baseUrl}/${systemId}`).subscribe({
      next: (_deleted: boolean) => {
        this.fetchIrrigationSystems();
        this.toastService.showSuccess(
          `O sistema de irrigação "${system.name}" foi excluído com sucesso.`
        );
      },
      error: (errorResponse: HttpErrorResponse) =>
        this.toastService.showError(errorResponse.error.message),
    });
  }

  get irrigationSystemsList() {
    return [...this.irrigationSystems];
  }

  openEditIrrigationSystemDialog(system: IrrigationSystem): void {
    this.editIrrigationSystemDialogOpen$.next(system);
  }

  openCreateIrrigationSystemDialog(): void {
    this.createIrrigationSystemDialogOpen$.next();
  }

  openShowIrrigationSystemsDialog(): void {
    this.showIrrigationSystemsDialogOpen$.next(true);
  }
}
