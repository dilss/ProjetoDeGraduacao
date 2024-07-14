import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { IrrigationSystemService } from '../../services/irrigation-system/irrigation-system.service';
import { IrrigationSystem } from '../../models/irrigation-system/irrigation-system.model';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  standalone: true,
  selector: 'app-create-irrigation-system',
  templateUrl: './create-irrigation-system.component.html',
  styleUrl: './create-irrigation-system.component.css',
})
export class CreateIrrigationSystemComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  isEdit: boolean = false;
  title: string = 'Cadastrar Sistema de Irrigação';
  systemEditId: number;
  subscriptions: Subscription[] = [];

  readonly irrigationSystemCategories = [
    'Superfície',
    'Aspersão',
    'Localizada',
  ];

  irrigationSystemForm: FormGroup<{
    name: FormControl<string>;
    category: FormControl<string>;
    type: FormControl<string>;
    efficiency: FormControl<number>;
    flowRate: FormControl<number>;
  }> = new FormGroup<{
    name: FormControl<string>;
    category: FormControl<string>;
    type: FormControl<string>;
    efficiency: FormControl<number>;
    flowRate: FormControl<number>;
  }>({
    name: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    efficiency: new FormControl(null, Validators.required),
    flowRate: new FormControl(null, Validators.required),
  });

  constructor(private irrigationSystemService: IrrigationSystemService) {}

  ngOnInit(): void {
    const sub1 =
      this.irrigationSystemService.createIrrigationSystemDialogOpen$.subscribe(
        () => {
          this.isEdit = false;
          this.title = 'Cadastrar Sistema de Irrigação';
          this.irrigationSystemForm.reset();
          this.showDialog();
        }
      );

    const sub2 =
      this.irrigationSystemService.editIrrigationSystemDialogOpen$.subscribe(
        (system) => {
          this.isEdit = true;
          this.title = 'Editar Sistema de Irrigação';
          this.systemEditId = system.id;
          this.irrigationSystemForm.setValue({
            name: system.name,
            category: system.category,
            type: system.type,
            efficiency: system.efficiency,
            flowRate: system.flowRate,
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
    let system: IrrigationSystem = new IrrigationSystem();
    const formValue = { ...this.irrigationSystemForm.value };
    system.name = formValue.name;
    system.category = formValue.category;
    system.type = formValue.type;
    system.efficiency = formValue.efficiency;
    system.flowRate = formValue.flowRate;

    if (this.isEdit) {
      system.id = this.systemEditId;
      this.irrigationSystemService.editIrrigationSystem(system);
      return;
    }
    this.irrigationSystemService.createIrrigationSystem(system);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
