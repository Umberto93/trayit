import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../client/storage.service';

@Injectable({
    providedIn: 'root'
})
export class Guest implements CanActivate {

    constructor(
        private router: Router,
        private storage: StorageService
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        return this.storage.getUser().then(
            user => {
                return !user || this.router.navigateByUrl('/menu/selection');
            }
        )
    }
}
