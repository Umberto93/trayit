import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(
        private http: HttpService
    ) { }

    public voteItem(id: number, data: Object): Observable<MenuItem> {
        return this.http.post(`/items/${id}/rating`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
    }
}
