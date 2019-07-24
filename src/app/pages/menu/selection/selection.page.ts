import { Component } from '@angular/core';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.page.html',
    styleUrls: ['./selection.page.scss'],
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
