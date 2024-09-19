import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from '../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  imports: [BlockUIModule, ProgressSpinnerModule],
  standalone: true,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent implements OnInit, OnDestroy {
  showSpinner: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    let subscription = this.spinnerService.spinnerCounter$.subscribe({
      next: (value: number) => (this.showSpinner = Boolean(value)),
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
