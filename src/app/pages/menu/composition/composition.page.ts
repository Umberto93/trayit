import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { MenuService } from 'src/app/services/server/menu.service';
import { MenuCategory } from 'src/app/interfaces/menu-category';
import { IonSlides, PopoverController } from '@ionic/angular';
import { SlideOptions } from '../slide.config';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { CounterPopoverComponent } from './counter-popover/counter-popover.component';
import { StorageService } from 'src/app/services/client/storage.service';
import { User } from 'src/app/interfaces/user';
import { SummaryService } from 'src/app/services/client/summary.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-composition',
    templateUrl: './composition.page.html',
    styleUrls: ['../menu.page.scss', './composition.page.scss'],
})
export class CompositionPage implements OnInit {
    @ViewChild(IonSlides) slides: IonSlides;

    titles: Array<String>;
    slideOptions: Object;
    activeIndex: number;
    menu: MenuCategory;
    alternative: boolean;
    launch: boolean;
    render: boolean;

    constructor(
        private route: ActivatedRoute,
        private storageService: StorageService,
        private menuService: MenuService,
        private summaryService: SummaryService,
        private popoverController: PopoverController
    ) {
        this.titles = [];
        this.slideOptions = SlideOptions;
        this.activeIndex = 0;
        this.menu = {} as MenuCategory;
        this.launch = false;
        this.render = false;
    }

    public ngOnInit() {
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            const type = this.getMenuType();
            const alternative = params.has('alternative');

            this.storageService.getUser().then(user => {
                console.log(user);
                const diet = params.get('diet') || this.getDiet(user);
                
                this.menuService.getMenu(type, alternative, diet).subscribe(
                    (menu: MenuCategory) => {
                        this.menu = menu;
                        setTimeout(() => {
                            this.render = true;
                        }, 500);
                    }
                );
            });

            this.titles = this.getSlideTitles(alternative);
            this.summaryService.initializeSummary(alternative);
        });
    }

    public noSort() {
        return 0;
    }

    public onSlideWillChange(): void {
        this.slides.getActiveIndex().then((index: number) => {
            this.activeIndex = index;
        });
    }

    public onSlideDidChange(): void {
        this.slides.update();
    }

    public presentAlert(course: string, item: MenuItem): void {
        this.popoverController.create({
            component: CounterPopoverComponent,
            componentProps: {
                course: course,
                item: item
            },
            cssClass: 'counter-popover',
        }).then(alert => {
            alert.present();
        });
    }

    private getMenuType(): number {
        const date = new Date();

        if (date.getHours() >= 10 && date.getHours() <= 16) {
            this.launch = true;
            return this.menuService.launch;
        }

        return this.menuService.dinner;
    }

    private getSlideTitles(alternative: boolean): Array<string> {
        if (alternative) {
            return ['Pizza', 'Cestino'];
        }

        return ['Primi', 'Secondi', 'Contorni', 'Extra'];
    }

    private getDiet(user: User): string {
        if (user.celiac) return 'celiac';
        if (user.vegetarian) return 'vegetarian';
        if (user.vegan) return 'vegan';

        return 'standard';
    }

    public clearStorage() {
        console.log(true);
        this.storageService.removeSummary();
        this.storageService.getSummary().then(summary => {
            console.log(summary);
        });
    }
}
