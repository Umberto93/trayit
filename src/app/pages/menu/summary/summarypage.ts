import { Component, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { Summary } from 'src/app/interfaces/summary';
import { MenuItem } from 'src/app/interfaces/menu-item';

import { RatingService } from 'src/app/services/server/rating.service';
import { StorageService } from 'src/app/services/client/storage.service';
import { NotificationService } from 'src/app/services/client/notification.service';
import { MenuService } from 'src/app/services/server/menu.service';
import { RatingComponent } from 'src/app/components/rating/rating.component';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.page.html',
    styleUrls: ['../menu.page.scss', '../../menu/composition/composition.page.scss', './summary.page.scss'],
})
export class SummaryPage {

    summary: Summary;
    imageError: boolean;
    render: boolean;

    constructor(
        private ratingService: RatingService,
        private storageService: StorageService,
        private alertController: AlertController,
        private notificationService: NotificationService,
        private menuService: MenuService
    ) {
        this.summary = {} as Summary;
        this.summary.price = 0;
        this.render = false;
        this.imageError = false;
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
                        const deletedItem = this.summary.items[course].splice(itemIndex, 1)[0];

                        // Update summary price
                        if (course === 'extra' && deletedItem.name.toLowerCase() !== 'pane') {
                            this.summary.price -= deletedItem.price;
                            this.summary.price = parseFloat(this.summary.price.toPrecision(3));
                        }

                        // Update summary quantity
                        this.summary.quantity--;

                        if (this.summary.quantity === 0) {
                            this.summary.price = 0;
                        }

                        this.storageService.setSummary(this.summary);
                        this.notificationService.showSuccess('Pietanza rimossa dal vassoio.');
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

    public onChange(rating: RatingComponent, value: number, course: string, itemId: number): void {
        this.alertController.create({
            header: 'Conferma Voto',
            message: `Il tuo voto è ${value}. Confermi?`,
            buttons: [
                {
                    text: 'Conferma',
                    handler: () => {
                        this.ratingService.voteItem(itemId, {
                            rating: value
                        }).subscribe(() => {
                            const filteredItem = this.summary.items[course].filter((item: MenuItem) => {
                                return item.id === itemId;
                            })[0] as MenuItem;

                            this.menuService.getItem(itemId, true).subscribe(item => {
                                rating.selected = item.rating;
                                filteredItem.rating = item.rating;
                                this.storageService.setSummary(this.summary);
                                this.notificationService.showSuccess('Voto aggiunto con successo.');
                            });
                        });
                    }
                },
                {
                    text: 'Annulla',
                    role: 'cancel'
                }
            ]
        }).then(alert => alert.present());
    }

    public defaultImage(image: HTMLImageElement) {
        this.imageError = true;
        image.src = "../../../../assets/icon/favicon.png";
    }

}
