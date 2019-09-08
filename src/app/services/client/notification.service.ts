import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        public toastController: ToastController
    ) { }

    public showSuccess(message: string): void {
        console.log('showSuccess: ' + message);
        this.presentToast(message, false);
    }

    public showError(message: string): void {
        this.presentToast(message, true);
        console.log('showError: ' + message);
    }


    private presentToast(messageText: string, error: boolean): void {
        this.toastController.create({
            header: error ? 'Error' : 'Success',
            message: messageText,
            duration: 2000,
            cssClass: error ? 'error-toast' : 'success-toast',
            buttons: [
                {
                    side: 'start',
                    icon: error ? 'alert' : 'checkmark-circle',
                    role: 'image'
                },
                {
                    side: 'end',
                    icon: 'close',
                    handler: () => {
                        this.toastController.dismiss();
                    }
                }]
        }).then(toast => toast.present());
    }
}