import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SoilService } from '../../services/soil/soil.service';
import { Soil } from '../../models/soil/soil.model';

@Component({
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  selector: 'app-create-soil',
  templateUrl: './create-soil.component.html',
  styleUrl: './create-soil.component.css',
})
export class CreateSoilComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  isEdit: boolean = false;
  title: string = 'Cadastrar Solo';
  soilEditId: number;
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
    cc: new FormControl(null, Validators.required),
    pmp: new FormControl(null, Validators.required),
    density: new FormControl(null, Validators.required),
  });

  constructor(private soilService: SoilService) {}

  ngOnInit(): void {
    const sub1 = this.soilService.createSoilDialogOpen$.subscribe(() => {
      this.isEdit = false;
      this.title = 'Cadastrar Solo';
      this.soilForm.reset();
      this.showDialog();
    });
    const sub2 = this.soilService.editSoilDialogOpen$.subscribe((soil) => {
      this.isEdit = true;
      this.title = 'Editar Solo';
      this.soilEditId = soil.id;
      this.soilForm.setValue({
        name: soil.name,
        cc: soil.fieldCapacity,
        pmp: soil.permanentWiltingPoint,
        density: soil.density,
      });
      this.showDialog();
    });
    const sub3 = this.soilService.dialogClosed$.subscribe(() =>
      this.hideDialog()
    );
    this.subscriptions.push(sub1, sub2, sub3);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  onSubmit(): void {
    let soil: Soil = new Soil();
    const formValue = { ...this.soilForm.value };
    soil.name = formValue.name;
    soil.fieldCapacity = formValue.cc;
    soil.permanentWiltingPoint = formValue.pmp;
    soil.density = formValue.density;
    if (this.isEdit) {
      soil.id = this.soilEditId;
      this.soilService.editSoil(soil);
      return;
    }
    this.soilService.createSoil(soil);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
