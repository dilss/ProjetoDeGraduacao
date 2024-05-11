import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { CrossCommunicationService } from '../services/cross-communication.service';
import { Subscription } from 'rxjs';
import { MENU_ITEMS } from './menu-items';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    imports: [MenuModule, SidebarModule, FontAwesomeModule],
    standalone: true,
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, OnDestroy {
    display: boolean = false;
    subscriptions: Subscription[] = [];
    readonly items: MenuItem[] = MENU_ITEMS;

    ngOnInit(): void {
        let sub: Subscription = this.crossCommunicationService.sideMenuOservable().subscribe( value => this.display = value);
        this.subscriptions.push(sub);      
    }

    constructor(private crossCommunicationService: CrossCommunicationService) {}

    menuClosed(): void {
        this.crossCommunicationService.toggleSideMenu();        
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach( sub => sub.unsubscribe());
    }
}