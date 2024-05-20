import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    standalone: true,
    selector: '[areaMenu]'
})
export class AreaMenuDirective {
    constructor(public viewContainerRef: ViewContainerRef){}
}