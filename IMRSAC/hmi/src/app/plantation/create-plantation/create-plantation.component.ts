import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { PlantationService } from '../../services/plantation/plantation.service';
import { Area } from '../../models/area/area.model';
import { AgriculturalCrop } from '../../models/agricultural-crop/agricultural-crop.model';
import { IrrigationSystem } from '../../models/irrigation-system/irrigation-system.model';
import { Plantation } from '../../models/plantation/plantation.model';
import { AreaService } from '../../services/map/area.service';
import { AgriculturalCropService } from '../../services/agricultural-crop/agricultural-crop.service';
import { IrrigationSystemService } from '../../services/irrigation-system/irrigation-system.service';

@Component({
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  standalone: true,
  selector: 'app-create-plantation',
  templateUrl: './create-plantation.component.html',
  styleUrl: './create-plantation.component.css',
})
export class CreatePlantationComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  isEdit: boolean = false;
  title: string = 'Cadastrar Plantação';
  plantationEditId: number;
  subscriptions: Subscription[] = [];

  areasOptions: Area[] = [];
  agriculturaCropsOptions: AgriculturalCrop[] = [];
  irrigationSystemsOptions: IrrigationSystem[] = [];

  plantationForm: FormGroup<{
    name: FormControl<string>;
    area: FormControl<Area>;
    agriculturalCrop: FormControl<AgriculturalCrop>;
    irrigationSystem: FormControl<IrrigationSystem>;
  }> = new FormGroup<{
    name: FormControl<string>;
    area: FormControl<Area>;
    agriculturalCrop: FormControl<AgriculturalCrop>;
    irrigationSystem: FormControl<IrrigationSystem>;
  }>({
    name: new FormControl(null, Validators.required),
    area: new FormControl(null, Validators.required),
    agriculturalCrop: new FormControl(null, Validators.required),
    irrigationSystem: new FormControl(null, Validators.required),
  });

  constructor(
    private plantationService: PlantationService,
    private areaService: AreaService,
    private agriculturalCropService: AgriculturalCropService,
    private irrigationSystemService: IrrigationSystemService
  ) {}

  ngOnInit(): void {
    const sub1 = this.plantationService.createPlantationDialogOpen$.subscribe(
      () => {
        this.isEdit = false;
        this.title = 'Cadastrar Plantação';
        this.plantationForm.reset();
        this.showDialog();
      }
    );

    const sub2 = this.plantationService.editPlantationDialogOpen$.subscribe(
      (plantation) => {
        this.isEdit = true;
        this.title = 'Editar Plantação';
        this.plantationEditId = plantation.id;
        this.areasOptions = this.areaService.areasList;
        this.agriculturaCropsOptions =
          this.agriculturalCropService.agriculturalCropsList;
        this.irrigationSystemsOptions =
          this.irrigationSystemService.irrigationSystemsList;
        this.plantationForm.setValue({
          name: plantation.name,
          area: this.areasOptions.find(
            (area) => area.id === plantation.area.id
          ),
          agriculturalCrop: this.agriculturaCropsOptions.find(
            (crop) => crop.id === plantation.agriculturalCrop.id
          ),
          irrigationSystem: this.irrigationSystemsOptions.find(
            (system) => system.id === plantation.irrigationSystem.id
          ),
        });
        this.showDialog();
      }
    );
    const sub3 = this.plantationService.dialogClosed$.subscribe(() =>
      this.hideDialog()
    );
    this.subscriptions.push(sub1, sub2, sub3);
    this.fillAllDropdownOptions();
  }

  onSubmit(): void {
    let plantation: Plantation = new Plantation();
    const formValue = { ...this.plantationForm.value };
    plantation.name = formValue.name;
    plantation.area = formValue.area;
    plantation.agriculturalCrop = formValue.agriculturalCrop;
    plantation.irrigationSystem = formValue.irrigationSystem;

    if (this.isEdit) {
      plantation.id = this.plantationEditId;
      this.plantationService.editPlantation(plantation);
      return;
    }
    this.plantationService.createPlantation(plantation);
  }

  private fillAllDropdownOptions(): void {
    this.areaService.fetchAreas();
    this.agriculturalCropService.fetchAgriculturalCrops();
    this.irrigationSystemService.fetchIrrigationSystems();
    const sub1 = this.areaService.areasListChanged$.subscribe(
      (areas) =>
        (this.areasOptions = areas.filter(
          (area) => !area.plantation && area.soil
        ))
    );
    const sub2 =
      this.agriculturalCropService.agriculturalCropListChanged$.subscribe(
        (crops) => (this.agriculturaCropsOptions = crops)
      );
    const sub3 =
      this.irrigationSystemService.irrigationSystemsListChanged$.subscribe(
        (systems) =>
          (this.irrigationSystemsOptions = systems.filter(
            (system) => !system.plantation
          ))
      );
    this.subscriptions.push(sub1, sub2, sub3);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
