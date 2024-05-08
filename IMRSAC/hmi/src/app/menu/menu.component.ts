import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenuModule } from 'primeng/menu';


@Component({
    imports: [MenuModule],
    standalone: true,
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {
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
}