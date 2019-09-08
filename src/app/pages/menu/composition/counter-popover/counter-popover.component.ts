import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { SummaryService } from 'src/app/services/client/summary.service';
import { PopoverController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/client/notification.service';

@Component({
    selector: 'app-counter-popover',
    templateUrl: './counter-popover.component.html',
    styleUrls: ['./counter-popover.component.scss'],
})
export class CounterPopoverComponent {

    @Input() course: string;
    @Input() item: MenuItem;

    constructor(
        private summaryService: SummaryService,
        private popoverController: PopoverController,
        private notificationService: NotificationService
    ) { }

    public addToTray(quantity: string): void {
        this.summaryService.addItem(this.course, this.item, parseInt(quantity)).then(
            err => {
                if (!err) {
                    this.notificationService.showSuccess('Pietanza aggiunta con successo.');
                    this.popoverController.dismiss();
                } else {
                    this.notificationService.showError(err);
                }
            }
        );
    }

}
