import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Category } from 'src/app/interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpService
    ) { }

    public getCategory(id: number): Observable<Category> {
        return this.http.get(`/categories/${id}`);
    }
}
