import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
        
@Component({
    selector: 'app-sensor-data-table-skeleton',
    templateUrl: './sensor-data-table-skeleton.component.html',
    standalone: true,
    imports: [CommonModule, SkeletonModule, TableModule]
})
export class SensorDataTableSkeletonComponent implements OnInit {
    measurements: any[] | undefined;

    ngOnInit() {
        this.measurements = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    }
}