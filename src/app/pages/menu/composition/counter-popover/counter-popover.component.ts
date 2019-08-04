import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
    selector: 'app-counter-popover',
    templateUrl: './counter-popover.component.html',
    styleUrls: ['./counter-popover.component.scss'],
})
export class CounterPopoverComponent {

    @Input() item: MenuItem

    constructor() {

    }

}
