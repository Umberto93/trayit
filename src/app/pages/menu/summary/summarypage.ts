import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/client/storage.service';
import { AlertController } from '@ionic/angular';
import { Summary } from 'src/app/interfaces/summary';
import { RatingService } from 'src/app/services/server/rating.service';
import { MenuItem } from 'src/app/interfaces/menu-item';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.page.html',
    styleUrls: ['../menu.page.scss', '../../menu/composition/composition.page.scss', './summary.page.scss'],
})
export class SummaryPage {

    summary: Summary;
    render: boolean;

    constructor(
        private storageService: StorageService,
        private alertController: AlertController,
        private ratingService: RatingService
    ) {
        this.summary = {} as Summary;
        this.summary.price = 0;
        this.render = false;
    }

    public ionViewWillEnter(): void {
        this.storageService.getSummary().then(summary => {
            if (summary) {
                this.summary = summary;
                setTimeout(() => {
                    this.render = true;
                }, 500);
            }
        });
    }

    public presentAlert(course: string, itemIndex: number): void {
        this.alertController.create({
            header: 'Rimuovi pietanza',
            message: 'Sei sicuro di voler rimuovere questa pietanza dal vassoio?',
            buttons: [
                {
                    text: 'Conferma',
                    handler: () => {
                        this.summary.items[course].splice(itemIndex, 1);
                        this.storageService.setSummary(this.summary);
                    }
                },
                {
                    text: 'Annulla',
                    role: 'cancel'
                }
            ]
        }).then(alert => {
            alert.present();
        });
    }

    public noSort(): number {
        return 0;
    }

    public onChange(value: number, course: string, itemId: number): void {
        this.ratingService.voteItem(itemId, {
            rating: value
        }).subscribe(() => {
            const filteredItem = this.summary.items[course].filter((item: MenuItem) => {
                return item.id === itemId;
            })[0] as MenuItem;

            filteredItem.rating = value;
            this.storageService.setSummary(this.summary);
        });
    }

}
