import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        console.error(error); //Log error in console.
        return error.message ? error.message : error.toString();
    }

    getServerMessage(error: HttpErrorResponse): string {
        console.error(error); //Log error in console.

        if (error.status >= 500 || error.status === 0) {
            return 'Non è stato possibile comunicare col server. Riprovare più tardi.';
        }
        
        return error.message;
    }

}
