import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { SummaryService } from 'src/app/services/client/summary.service';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-counter-popover',
    templateUrl: './counter-popover.component.html',
    styleUrls: ['./counter-popover.component.scss'],
})
export class CounterPopoverComponent {

    @Input() course: string;
    @Input() item: MenuItem;

    errorMessage: boolean | string;

    constructor(
        private popoverController: PopoverController,
        private summaryService: SummaryService
    ) { }

    public addToTray(quantity: string): void {
        this.summaryService.addItem(this.course, this.item, parseInt(quantity)).then(
            err => {
                if (!err) {
                    this.popoverController.dismiss();
                }
                this.errorMessage = err;
            }
        );
    }

}
