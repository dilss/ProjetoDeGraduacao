import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';
import {SidebarModule} from 'primeng/sidebar';
import { CrossComunicationService as CrossCommunicationService } from '../services/cross-comunication.service';
import { Subscription } from 'rxjs';


@Component({
    imports: [MenuModule, SidebarModule],
    standalone: true,
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
    display: boolean = false;
    subscriptions: Subscription[] = [];
    items: MenuItem[] = [
        {
            label: 'Documents',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search'
                }
            ]
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-spin pi-cog'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ];

    constructor(private crossCommunicationService: CrossCommunicationService) {}

    menuClosed(): void {
        this.crossCommunicationService.toggleSideMenu();        
    }

    ngOnInit(): void {
        let sub: Subscription = this.crossCommunicationService.sideMenuOservable().subscribe( value => this.display = value);
        this.subscriptions.push(sub);      
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach( sub => sub.unsubscribe());
    }
}