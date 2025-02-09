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
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';

@Component({
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    DropdownModule,
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

  readonly surfaceTypeSystems = [
    'Bacias em nível',
    'Sulcos',
    'Pulso(Surge flow)',
    'Faixas',
    'Sulcos Corrugados',
  ];

  readonly sprinklerTypeSystems = [
    'Movimento linear',
    'Pivô central (baixa pressão)',
    'Pivô central (alta pressão)',
    'Aspersão fixo',
    'Aspersão portátil',
    'Autopropelido',
  ];

  readonly localizedTypeSystems = [
    'Gotejamento superficial',
    'Gotejamento enterrado',
    'Microaspersão',
  ];

  sytemTypes: string[] = [];

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
          this.initSelectFields(system.category);
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
    const sub3 = this.irrigationSystemService.dialogClosed$.subscribe(() =>
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

  systemCategoryChanged(event: DropdownChangeEvent): void {
    this.initSelectFields(event.value);
  }

  initSelectFields(category: string): void {
    switch (category) {
      case 'Superfície':
        this.sytemTypes = this.surfaceTypeSystems;
        break;
      case 'Aspersão':
        this.sytemTypes = this.sprinklerTypeSystems;
        break;
      case 'Localizada':
        this.sytemTypes = this.localizedTypeSystems;
        break;
      default:
        this.sytemTypes = [];
    }
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
