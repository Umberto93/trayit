import { Component } from '@angular/core';
import { SlideOptions } from '../slide.config';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.page.html',
    styleUrls: ['../menu.page.scss', './selection.page.scss'],
})
export class SelectionPage {

    slideOptions: Object;

    constructor() {
        this.slideOptions = SlideOptions;
    }

}
