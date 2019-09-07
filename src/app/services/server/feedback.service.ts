import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/interfaces/feedback';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    constructor(
        private http: HttpService
    ) { }

    public sendFeedback(data: Feedback): Observable<Feedback> {
        return this.http.post(`/feedbacks`, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
    }
}
