import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private storage: Storage
    ) { }

    public getUser(): Promise<User> {
        return this.storage.get('user');
    }

    public setUser(user: User): void {
        this.storage.set('user', user);
    }

    public removeUser(): void {
        this.storage.remove('user');
    }
}
