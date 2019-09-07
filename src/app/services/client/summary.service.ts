import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Summary } from 'src/app/interfaces/summary';
import { MenuTraditional } from 'src/app/interfaces/menu-traditional';
import { MenuAlternative } from 'src/app/interfaces/menu-alternative';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { MenuService } from '../server/menu.service';
import { CategoryService } from '../server/category.service';

@Injectable({
    providedIn: 'root'
})
export class SummaryService {

    private menuTraditional: MenuTraditional;
    private menuAlternative: MenuAlternative;
    private summary: Summary;

    constructor(
        private storage: StorageService,
        private menuService: MenuService,
        private categoryService: CategoryService
    ) {
        this.menuTraditional = {} as MenuTraditional;
        this.menuAlternative = {} as MenuAlternative;

        this.menuTraditional.first = [] as Array<MenuItem>;
        this.menuTraditional.main = [] as Array<MenuItem>;
        this.menuTraditional.side = [] as Array<MenuItem>;
        this.menuTraditional.extra = [] as Array<MenuItem>;

        this.menuAlternative.basket = [] as Array<MenuItem>;
        this.menuAlternative.pizza = [] as Array<MenuItem>;
    }

    public initializeSummary(alternative: boolean): void {
        this.storage.getSummary().then(summary => {
            if (!summary) {
                this.summary = {} as Summary;
                this.summary.alternative = alternative;
                this.summary.items = alternative ? this.menuAlternative : this.menuTraditional;
                this.summary.price = 0;
                this.storage.setSummary(this.summary);
            }
        });
    }

    public addItem(course: string, item: MenuItem, quantity: number): Promise<boolean | string> {
        return this.storage.getSummary().then(summary => {
            this.summary = summary;

            if (this.summary) {
                if (!this.summary.alternative) {

                    if (quantity === 0) {
                        return 'Selezionare almeno un elemento.'
                    }

                    if (course !== 'extra') {
                        if (this.summary.items[course].length > 0) {
                            return `Non è possibile selezionare più ${this.menuService.translateCategory(course)}.`;
                        }
                    } else {
                        if (this.isBread(item)) {
                            if (this.selectedBreads() + quantity > 2) {
                                return 'Non è possibile aggiungere più di 2 panini.';
                            }
                        } else {
                            if (this.summary.items[course].length + quantity - this.selectedBreads() > 2) {
                                return 'Non è possibile aggiungere più di 2 extra.';
                            }
                        }
                    }
                } else {
                    if (course === 'pizza') {
                        if (this.summary.items['basket'].length > 0) {
                            return `Non è possibile aggiungere al cestino quando è attiva l'opzione pizza.`;
                        }

                        if (this.summary.items[course].length > 0) {
                            return `Non è possibile aggiungere più di 1 pizza.`;
                        }
                    } else {
                        if (this.summary.items['pizza'].length > 0) {
                            return `Non è possibile aggiungere la pizza quando è attiva l'opzione cestino.`;
                        }

                        if (this.summary.items[course].length === 4) {
                            return `Non è possibile aggiungere più di 4 pezzi.`;
                        }
                    }
                }

                this.addToSummary(course, item, quantity);
            }
        });
    }


    public getSummary(): Summary {
        return this.summary;
    }

    private isBread(item: MenuItem): boolean {
        return item.name.toLocaleLowerCase() === 'pane';
    }

    private selectedBreads(): number {
        return this.summary.items['extra'].filter((item: MenuItem) => {
            return this.isBread(item);
        }).length;
    }

    private addToSummary(course: string, item: MenuItem, quantity: number): void {
        this.storage.getUser().then(user => {
            this.categoryService.getCategory(user.category).subscribe(category => {
                switch (course) {
                    case 'pizza':
                        this.summary.price = category.pricepizza;
                        break;
                    case 'basket':
                        this.summary.price = category.pricebasket;
                        break;
                    default:
                        if (course !== 'extra' || this.isBread(item)) {
                            if (this.summary.price < category.pricetraditional) {
                                this.summary.price = category.pricetraditional;
                            }
                        } else {
                            this.summary.price += item.price * quantity;
                        }
                }

                for (let i = 0; i < quantity; i++) {
                    this.summary.items[course].push(item);
                }

                this.storage.setSummary(this.summary);
            });
        });
    }

}
