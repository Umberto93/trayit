import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/server/menu.service';
import { MenuCategory } from 'src/app/interfaces/menu-category';
import { IonSlides } from '@ionic/angular';

@Component({
    selector: 'app-composition',
    templateUrl: './composition.page.html',
    styleUrls: ['./composition.page.scss'],
})
export class CompositionPage {
    @ViewChild('slides') slides: IonSlides;

    menu: MenuCategory;
    activeIndex: number;
    selectedItems: Array<string>;

    constructor(
        private route: ActivatedRoute,
        private menuService: MenuService
    ) {
        this.menu = {} as MenuCategory;
        this.activeIndex = 0;
        this.selectedItems = [];
    }

    public ionViewWillEnter(): void {
        this.route.queryParams.subscribe(
            params => {
                const menu = this.menuService.launch;
                const alternative = params.alternative || false;

                this.menuService.getMenu(menu, alternative).subscribe(
                    (menu: MenuCategory) => {
                        this.menu = menu;
                        console.log(this.menu);
                    }
                )
            }
        );
    }

    public noSort() {
        return 0;
    }

    public slideTo(index: number): void {
        this.slides.slideTo(index);
    }

    public updateTab(): void {
        this.slides.getActiveIndex().then(
            index => {
                this.activeIndex = index;
            }
        );
    }

    public increaseCounter(item: string, counter: HTMLIonBadgeElement) {
        let counterValue = parseInt(counter.dataset.value);
        counter.dataset.value = (counterValue + 1).toString();
        
        if (this.selectedItems.indexOf(item) === -1) {
            this.selectedItems.push(item);
        }
    }

    public decreaseCounter(item: string, counter: HTMLIonBadgeElement) {
        let counterValue = parseInt(counter.dataset.value);
        counterValue -= +(counterValue > 0);
        counter.dataset.value = counterValue.toString();
    }
}
