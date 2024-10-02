import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Column {
  field: string;
  header: string;
}

@Component({
  imports: [CommonModule, TableModule, ButtonModule],
  standalone: true,
  selector: 'app-sensor-data-table',
  templateUrl: './sensor-data-table.component.html',
  styleUrl: './sensor-data-table.component.css',
})
export class SensorDataTableComponent implements OnInit {
  @Input() measurements: { soilWaterContent: number; localDateTime: string }[] =
    [];
  @Input() sensorName: string = '...';
  @Output() onButtonCliked: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();
  cols!: Column[];

  ngOnInit(): void {
    this.cols = [
      { field: 'soilWaterContent', header: 'Umidade medida (g/g)' },
      { field: 'localDateTime', header: 'Hora de aferição (horário local)' },
    ];
  }

  closeClicked(event: MouseEvent) {
    this.onButtonCliked.emit(event);
  }
}
