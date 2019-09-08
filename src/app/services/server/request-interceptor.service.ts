import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StorageService } from '../client/storage.service';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private storage: StorageService,
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

                return next.handle(req)
                    .pipe(
                        catchError((err) => {
                            if (err.status === 401) {
                                this.storage.removeUser();
                                this.router.navigateByUrl('/login');
                            }

                            throw err;
                        })
                    );
            }));
    }
}
