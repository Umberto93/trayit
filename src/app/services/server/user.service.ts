import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupForm } from '../../interfaces/signup-form';
import { LoginForm } from '../../interfaces/login-form';
import { User } from '../../interfaces/user';
import { map } from 'rxjs/operators';
import { StorageService } from '../client/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpService,
        private storage: StorageService
    ) { }

    public checkEmail(email: string): Promise<any> {
        return this.http.get(`/users/emails/${email}`).toPromise();
    }

    public signup(data: SignupForm): Observable<User> {
        return this.http.post('/signup', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
    }

    public loginWithCredentials(data: LoginForm): Observable<User> {
        return this.http.post('/login', {}, {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + btoa(`${data.email}:${data.password}`)
            })
        }).pipe(
            map((user: User) => {
                this.storage.setUser(user);
                return user;
            })
        );
    }

    public logout(): void {
        this.storage.removeUser();
    }

}
