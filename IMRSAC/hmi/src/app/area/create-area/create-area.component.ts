import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { Area } from '../../models/area/area.model';
import { Coordinate } from '../../models/area/coordinate.model';
import { AreaService } from '../../services/map/area.service';
import { DropdownModule } from 'primeng/dropdown';
import { Soil } from '../../models/soil/soil.model';
import { SoilService } from '../../services/soil/soil.service';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    DividerModule,
    DropdownModule,
  ],
  standalone: true,
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.css',
})
export class CreateAreaComponent implements OnInit, OnDestroy {
  createAreaForm = this.formBuilder.group({
    name: ['', Validators.required],
    soilId: [null],
    coordinates: this.formBuilder.array([]),
  });

  subscriptions: Subscription[] = [];

  coordinatesQuantity: number = 0;

  soils: Soil[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private areaService: AreaService,
    private soilService: SoilService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const sub = this.soilService.soilsListChanged$.subscribe(
      (soils) => (this.soils = [...soils])
    );
    this.soilService.fetchSoils();
    for (let index = 0; index < 3; index++) {
      this.addCoordinate();
    }
    this.subscriptions.push(sub);
  }

  get coordinates() {
    return this.createAreaForm.get('coordinates') as FormArray;
  }

  castCoordinateFormToFormGroup(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  addCoordinate() {
    const coordinateForm = this.formBuilder.group({
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
    });
    this.coordinates.push(coordinateForm);
  }

  deleteCoordinate(coordenateIndex: number) {
    this.coordinates.removeAt(coordenateIndex);
  }

  onSubmit() {
    let area: Area = new Area();
    area.name = this.createAreaForm.value.name;
    area.soilId = this.createAreaForm.value.soilId;
    let index: number = 0;
    this.createAreaForm.value.coordinates.forEach(
      (value: { latitude: number; longitude: number }) =>
        area.coordinates.push({
          latitude: value.latitude,
          longitude: value.longitude,
          nodeOrder: ++index,
        } as Coordinate)
    );
    this.areaService.createArea(area);
  }

  cancelChanges(): void {
    this.confirmationService.confirm({
      message: 'As alterações feitas serão perdidas',
      header: 'Sair Sem Salvar?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.confirmationService.close();
        this.router.navigate(['home']);
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
