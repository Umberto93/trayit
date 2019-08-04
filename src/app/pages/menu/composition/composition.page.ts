import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/server/menu.service';
import { MenuCategory } from 'src/app/interfaces/menu-category';
import { IonSlides, PopoverController } from '@ionic/angular';
import { SlideOptions } from '../slide.config';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { CounterPopoverComponent } from './counter-popover/counter-popover.component';

@Component({
    selector: 'app-composition',
    templateUrl: './composition.page.html',
    styleUrls: ['../menu.page.scss', './composition.page.scss'],
})
export class CompositionPage {
    @ViewChild(IonSlides) slides: IonSlides;

    titles: Array<String>;
    slideOptions: Object;
    activeIndex: number;
    menu: MenuCategory;

    constructor(
        private route: ActivatedRoute,
        private menuService: MenuService,
        private popoverController: PopoverController
    ) {
        this.titles = [];
        this.slideOptions = SlideOptions;
        this.activeIndex = 0;
        this.menu = {} as MenuCategory;
    }

    public ionViewWillEnter(): void {
        this.route.queryParams.subscribe(
            params => {
                const menu = this.menuService.launch;
                const alternative = params.alternative || false;

                this.titles = alternative ? ['Pizza', 'Extra'] : ['Primi', 'Secondi', 'Contorni', 'Extra'];
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

    public onSlideWillChange(): void {
        this.slides.getActiveIndex().then((index: number) => {
            this.activeIndex = index;
        });
    }

    public presentAlert(item: MenuItem): void {
        this.popoverController.create({
            component: CounterPopoverComponent,
            componentProps: {
                item: item
            },
            cssClass: 'counter-popover'
        }).then(alert => {
            alert.present();
        });
    }
}
