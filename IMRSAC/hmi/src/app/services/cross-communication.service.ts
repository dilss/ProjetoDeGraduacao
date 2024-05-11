import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrossCommunicationService {
  private $openSideMenu: Subject<boolean> = new Subject<boolean>();
  private isMenuOpen: boolean = false;

  toggleSideMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.$openSideMenu.next(this.isMenuOpen);
  }

  sideMenuOservable() {
    return this.$openSideMenu.asObservable();
  }
}
