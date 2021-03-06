import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MenuCategory } from 'src/app/interfaces/menu-category';
import { MenuItem } from 'src/app/interfaces/menu-item';

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
            case 'first': return 'primi';
            case 'main': return 'secondi';
            case 'side': return 'contorni';
            case 'basket': return 'basket';
            default: return category;
        }
    }

    public getMenu(id: number, alternative?: boolean, diet?: string): Observable<MenuCategory> {
        return this.http.get(`/menu/${id}`, {
            params: new HttpParams()
                .set('alternative', alternative.toString())
                .set('diet', diet)
        });
    }

    public getItem(id: number, includeRating: boolean): Observable<MenuItem> {
        return this.http.get(`/items/${id}`, {
            params: new HttpParams()
                .set('includeRating', includeRating.toString())
        });
    }
}
