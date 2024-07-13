import { Component, OnDestroy, OnInit } from '@angular/core';
import { AgriculturalCropService } from '../../services/agricultural-crop/agricultural-crop.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgriculturalCrop } from '../../models/agricultural-crop/agricultural-crop.model';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  imports: [DialogModule, ReactiveFormsModule, InputNumberModule, InputTextModule, ButtonModule],
  standalone: true,
  selector: 'app-create-agricultural-crop',
  templateUrl: './create-agricultural-crop.component.html',
  styleUrl: './create-agricultural-crop.component.css',
})
export class CreateAgriculturalCropComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  title: string = 'Cadastrar Nova Cultura';
  visible: boolean = false;
  cropEditId: number;

  subscriptions: Subscription[] = [];

  cropForm: FormGroup<{
    name: FormControl<string>;
    rootDepth: FormControl<number>;
    waterAvailabilityFactor: FormControl<number>;
    cycleDurationDays: FormControl<number>;
    durationPercentagePhaseOne: FormControl<number>;
    durationPercentagePhaseTwo: FormControl<number>;
    durationPercentagePhaseThree: FormControl<number>;
    durationPercentagePhaseFour: FormControl<number>;
  }> = new FormGroup<{
    name: FormControl<string>;
    rootDepth: FormControl<number>;
    waterAvailabilityFactor: FormControl<number>;
    cycleDurationDays: FormControl<number>;
    durationPercentagePhaseOne: FormControl<number>;
    durationPercentagePhaseTwo: FormControl<number>;
    durationPercentagePhaseThree: FormControl<number>;
    durationPercentagePhaseFour: FormControl<number>;
  }>({
    name: new FormControl<string>(null, Validators.required),
    rootDepth: new FormControl<number>(null, Validators.required),
    waterAvailabilityFactor: new FormControl<number>(null, Validators.required),
    cycleDurationDays: new FormControl<number>(null, Validators.required),
    durationPercentagePhaseOne: new FormControl<number>(
      null,
      Validators.required
    ),
    durationPercentagePhaseTwo: new FormControl<number>(
      null,
      Validators.required
    ),
    durationPercentagePhaseThree: new FormControl<number>(
      null,
      Validators.required
    ),
    durationPercentagePhaseFour: new FormControl<number>(
      null,
      Validators.required
    ),
  });

  constructor(private agriculturalCropService: AgriculturalCropService) {}

  ngOnInit(): void {
    const sub1 =
      this.agriculturalCropService.createAgriculturalCropDialogOpen$.subscribe(
        () => {
          this.isEdit = false;
          this.title = 'Cadastrar Nova Cultura';
          this.cropForm.reset();
          this.showDialog();
        }
      );
    const sub2 =
      this.agriculturalCropService.editAgriculturalCropDialogOpen$.subscribe(
        (crop) => {
          this.isEdit = true;
          this.title = 'Editar Cultura';
          this.cropEditId = crop.id;
          this.cropForm.setValue({
            name: crop.name,
            rootDepth: crop.rootDepth,
            waterAvailabilityFactor: crop.waterAvailabilityFactor,
            cycleDurationDays: crop.cicleDurationDays,
            durationPercentagePhaseOne: crop.durationPercentagePhaseOne,
            durationPercentagePhaseTwo: crop.durationPercentagePhaseTwo,
            durationPercentagePhaseThree: crop.durationPercentagePhaseThree,
            durationPercentagePhaseFour: crop.durationPercentagePhaseFour,
          });
          this.showDialog();
        }
      );
    this.subscriptions.push(sub1, sub2);
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit(): void {
    let crop: AgriculturalCrop = new AgriculturalCrop();
    const formValue = { ...this.cropForm.value };
    crop.name = formValue.name;
    crop.rootDepth = formValue.rootDepth;
    crop.waterAvailabilityFactor = formValue.waterAvailabilityFactor;
    crop.cicleDurationDays = formValue.cycleDurationDays;
    crop.durationPercentagePhaseOne = formValue.durationPercentagePhaseOne;
    crop.durationPercentagePhaseTwo = formValue.durationPercentagePhaseTwo;
    crop.durationPercentagePhaseThree = formValue.durationPercentagePhaseThree;
    crop.durationPercentagePhaseFour = formValue.durationPercentagePhaseFour;

    if (this.isEdit) {
      crop.id = this.cropEditId;
      this.agriculturalCropService.editAgriculturalCrop(crop);
      return;
    }
    this.agriculturalCropService.createAgriculturalCrop(crop);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
