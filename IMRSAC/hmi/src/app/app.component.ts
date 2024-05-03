import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbSidebarService } from '@nebular/theme';
import { RouterModule } from '@angular/router';

@Component({
  imports: [
    HeaderComponent,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
  ],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hmi';

  constructor(private sidebarService: NbSidebarService) {}

  toggle() {
    this.sidebarService.toggle();
  }
}
