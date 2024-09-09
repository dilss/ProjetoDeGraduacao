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
import { PlantationService } from '../../services/plantation/plantation.service';

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
    private plantationService: PlantationService,
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
    let index: number = 0;
    let coordinates: Coordinate[] = [];

    this.createAreaForm.value.coordinates.forEach(
      (value: { latitude: number; longitude: number }) => {
        coordinates.push(
          new Coordinate(
            value.latitude,
            value.longitude,
            ++index,
            this.areaToEdit ? this.areaToEdit.id : null
          )
        );
      }
    );
    let area: Area = new Area(this.createAreaForm.value.name, coordinates);
    area.soilId = this.createAreaForm.value.soilId;
    if (this.areaToEdit) {
      area.id = this.areaToEdit.id;
      // If a soil weren't selected, the plantation in the soil will be deleted, plantations cannot exist without a soil
      if (this.areaToEdit.plantation && !area.soilId) {
        this.onSaveAreaWithoutASoil(area);
      } else {
        this.areaService.editArea(area);
      }
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
      header: 'As alterações feitas serão perdidas',
      message: 'Sair Sem Salvar?',
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

  onSaveAreaWithoutASoil(area: Area): void {
    this.confirmationService.confirm({
      header: 'Salvar a área sem um tipo de solo irá excluir a plantação',
      message: 'Deseja prosseguir com as alterações?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.plantationService.deletePlantation(this.areaToEdit.plantation.id);
        this.areaService.editArea(area);
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
