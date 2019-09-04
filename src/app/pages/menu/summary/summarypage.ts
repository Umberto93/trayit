import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/client/storage.service';
import { AlertController } from '@ionic/angular';
import { Summary } from 'src/app/interfaces/summary';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.page.html',
    styleUrls: ['../menu.page.scss', '../../menu/composition/composition.page.scss', './summary.page.scss'],
})
export class SummaryPage {

    public summary: Summary;

    constructor(
        private storageService: StorageService,
        private alertController: AlertController
    ) {
        this.summary = {} as Summary;
        this.summary.price = 0;
    }

    public ionViewWillEnter(): void {
        this.storageService.getSummary().then(summary => {
            if (summary) {
                this.summary = summary;
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

}
