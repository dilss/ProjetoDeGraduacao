import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
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
  @Input() areaToEditId?: string;

  areaToEdit?: Area;
  title: string = 'Cadastrar Nova Área';
  iconName: string = 'field-new';

  createAreaForm: FormGroup<{
    name: FormControl<string>;
    soilId: FormControl<number>;
    coordinates: FormArray<
      FormGroup<{
        latitude: FormControl<number>;
        longitude: FormControl<number>;
      }>
    >;
  }> = new FormGroup<{
    name: FormControl<string>;
    soilId: FormControl<number>;
    coordinates: FormArray<
      FormGroup<{
        latitude: FormControl<number>;
        longitude: FormControl<number>;
      }>
    >;
  }>({
    name: new FormControl('', Validators.required),
    soilId: new FormControl(null),
    coordinates: new FormArray<
      FormGroup<{
        latitude: FormControl<number>;
        longitude: FormControl<number>;
      }>
    >([]),
  });

  subscriptions: Subscription[] = [];

  coordinatesQuantity: number = 0;

  soils: Soil[] = [];

  constructor(
    private router: Router,
    private areaService: AreaService,
    private soilService: SoilService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const sub = this.soilService.soilsListChanged$.subscribe(
      (soils) => (this.soils = [...soils])
    );
    if (this.areaToEditId) {
      this.title = 'Editar Área';
      this.iconName = 'field';
      this.areaToEdit = this.areaService.areasList.find(
        (area) => area.id === parseInt(this.areaToEditId)
      );
      this.fillFormWithAreaToEdit();
    } else {
      for (let index = 0; index < 3; index++) {
        this.addCoordinateToFormArray();
      }
    }
    this.soilService.fetchSoils();
    this.subscriptions.push(sub);
  }

  addCoordinateToFormArray(latitude: number = null, longitude: number = null) {
    const coordinateForm = new FormGroup<{
      latitude: FormControl<number>;
      longitude: FormControl<number>;
    }>({
      latitude: new FormControl(latitude, Validators.required),
      longitude: new FormControl(longitude, Validators.required),
    });
    this.createAreaForm.controls.coordinates.push(coordinateForm);
  }

  deleteCoordinate(coordenateIndex: number) {
    this.createAreaForm.controls.coordinates.removeAt(coordenateIndex);
  }

  onSubmit() {
    let area: Area = new Area();
    area.name = this.createAreaForm.value.name;
    area.soilId = this.createAreaForm.value.soilId;
    let index: number = 0;
    this.createAreaForm.value.coordinates.forEach(
      (value: { latitude: number; longitude: number }) =>
        area.coordinates.push({
          areaId: this.areaToEdit ? this.areaToEdit.id : null,
          latitude: value.latitude,
          longitude: value.longitude,
          nodeOrder: ++index,
        } as Coordinate)
    );
    if (this.areaToEdit) {
      area.id = this.areaToEdit.id;
      this.areaService.editArea(area);
      return;
    }
    this.areaService.createArea(area);
  }

  fillFormWithAreaToEdit(): void {
    this.createAreaForm.controls.name.setValue(this.areaToEdit.name);
    this.createAreaForm.controls.soilId.setValue(this.areaToEdit.soil?.id);
    this.areaToEdit.coordinates.forEach((coordinate) => {
      this.addCoordinateToFormArray(coordinate.latitude, coordinate.longitude);
    });
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
      reject: () => this.confirmationService.close(),
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
