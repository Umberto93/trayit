import { Component } from '@angular/core';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.scss'],
})
export class SelectionPage {

    slideOptions: Object;

    constructor() {
        this.slideOptions = {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            grabCursor: true,
            autoHeight: true
        }
    }

}
