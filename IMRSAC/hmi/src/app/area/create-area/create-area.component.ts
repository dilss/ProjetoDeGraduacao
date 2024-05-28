import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    DividerModule,
  ],
  standalone: true,
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.css',
})
export class CreateAreaComponent implements OnInit {
  createAreaForm = this.formBuilder.group({
    name: ['', Validators.required],
    coordinates: this.formBuilder.array([]),
  });

  coordinatesQuantity: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private areaService: AreaService
  ) {}

  ngOnInit() {
    for (let index = 0; index < 3; index++) {
      this.addCoordinate();
    }
  }

  get coordinates() {
    return this.createAreaForm.get('coordinates') as FormArray;
  }

  castCoordinateFormToFormGroup(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  addCoordinate() {
    const coordinateForm = this.formBuilder.group({
      order: [0, Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
    });
    this.coordinates.push(coordinateForm);
  }

  deleteCoordinate(coordenateIndex: number) {
    this.coordinates.removeAt(coordenateIndex);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.createAreaForm.value);

    let area: Area = new Area();
    area.name = this.createAreaForm.value.name;
    area.id = "area3"

    area.points = this.createAreaForm.value.coordinates.map(
      (coordinate: { order: number; latitude: number; longitude: number }) => {
        let point: Coordinate = new Coordinate();
        point.id = 0;
        point.order = 0;
        point.latitude = coordinate.latitude;
        point.longitude = coordinate.longitude;
        return point;
      }
    );
    this.areaService.createArea(area);
    console.log("==================== Areas ===================");
    console.log(this.areaService.getAreas());
  }
}
