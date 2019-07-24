import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { StorageService } from '../client/storage.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.getUser()).pipe(
            switchMap(user => {
                if (user) {
                    req = req.clone({
                        setHeaders: {
                            'X-Auth-Token': user.auth
                        }
                    })
                }

                return next.handle(req);
            })
        );
    }
}
