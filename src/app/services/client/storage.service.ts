import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/interfaces/user';
import { Summary } from 'src/app/interfaces/summary';

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

    public getSummary(): Promise<Summary> {
        return this.storage.get('summary');
    }

    public setSummary(summary: Summary): void {
        this.storage.set('summary', summary);
    }

    public removeSummary(): void {
        this.storage.remove('summary');
    }
}
