import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../client/storage.service';

@Injectable({
    providedIn: 'root'
})
export class Logged implements CanActivate {

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
                return user !== null || this.router.navigateByUrl('');
            }
        )
    }
}
