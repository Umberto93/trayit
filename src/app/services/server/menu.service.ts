import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MenuCategory } from 'src/app/interfaces/menu-category';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    readonly launch = 1;
    readonly dinner = 2;

    constructor(
        private http: HttpService
    ) { }

    public translateCategory(category: string): string {
        switch (category) {
            case 'first': return 'primo';
            case 'main': return 'secondo';
            case 'side': return 'contorno';
            case 'basket': return 'basket';
            default: return category;
        }
    }

    public getMenu(id: number, alternative?: boolean): Observable<MenuCategory> {
        return this.http.get(`/menu/${id}`, {
            params: new HttpParams()
                .set('alternative', alternative.toString())
        });
    }
}
