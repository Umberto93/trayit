import { Component } from '@angular/core';
import { faqs } from './faqs';
import { Faq } from 'src/app/interfaces/faq';

@Component({
    selector: 'app-faqs',
    templateUrl: './faqs.page.html',
    styleUrls: ['../other.component.scss', './faqs.page.scss'],
})
export class FaqsPage {

    faqs: Array<Faq>;

    constructor() { }

    public ionViewWillEnter(): void {
        this.faqs = faqs;
    }

}
