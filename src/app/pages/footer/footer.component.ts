import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MorePopoverComponent } from './more-popover/more-popover.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

    route: string;

    constructor(
        private router: Router,
        private popoverController: PopoverController
    ) {
        this.route = '/menu/composition';
        this.router.events.subscribe(nav => {
            if (nav instanceof NavigationStart) {
                if (nav.url.startsWith(this.route)) {
                    localStorage.setItem('compositionRoute', nav.url);
                }
            }
        });
    }

    public toComposition(): void {
        this.route = localStorage.getItem('compositionRoute') || this.route;
        this.router.navigateByUrl(this.route);
    }

    public presentPopover(event: Event): void {
        this.popoverController.create({
            component: MorePopoverComponent,
            event: event,
            cssClass: 'more-popover'
        }).then(popover => {
            popover.present();
        });
    }

}
