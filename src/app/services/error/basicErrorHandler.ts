import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { NotificationService } from '../client/notification.service';


@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(
        public injector: Injector
    ) { }

    handleError(response: Error | HttpErrorResponse) {
        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);

        let message: string;
        
        if (response instanceof HttpErrorResponse) {
            // Server Error
            console.log('server error');
            message = errorService.getServerMessage(response.error);
        } else {
            // Client Error
            console.log('client error');
            message = errorService.getClientMessage(response);
        }

        if (message) {
            notifier.showError(message);
        }
    }
}