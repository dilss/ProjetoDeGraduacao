import { Component, OnDestroy, OnInit, numberAttribute } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SoilService } from '../services/soil/soil.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Soil } from '../models/soil/soil.model';

@Component({
  imports: [DialogModule, ButtonModule, InputTextModule, InputNumberModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-create-soil',
  templateUrl: './create-soil.component.html',
  styleUrl: './create-soil.component.css',
})
export class CreateSoilComponent implements OnInit, OnDestroy {
  visible: boolean = false;

  subscriptions: Subscription[] = [];

  soilForm: FormGroup<{
    name: FormControl<string>;
    cc: FormControl<number>;
    pmp: FormControl<number>;
    density: FormControl<number>;
  }> = new FormGroup<{
    name: FormControl<string>;
    cc: FormControl<number>;
    pmp: FormControl<number>;
    density: FormControl<number>;
  }>({
    name: new FormControl('', Validators.required),
    cc: new FormControl(0, Validators.required),
    pmp: new FormControl(0, Validators.required),
    density: new FormControl(0, Validators.required),
  });

  constructor(private soilService: SoilService) {}

  ngOnInit(): void {
    const subscription = this.soilService.dialogOpen$.subscribe(
      (isVisible) => (this.visible = isVisible)
    );
    this.subscriptions.push(subscription);
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit(): void {
    let soil: Soil = new Soil();
    const formValue = {...this.soilForm.value};
    soil.name = formValue.name;
    soil.fieldCapacity = formValue.cc;
    soil.permanentWiltingPoint = formValue.pmp;
    soil.density = formValue.density;
    this.soilService.createSoil(soil);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
