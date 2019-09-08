import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { UserService } from 'src/app/services/server/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() title: string;
    @Input() filterButton: string;
    @Input() price: string;
    @Input() logoutIcon: string;

    constructor(
        private router: Router,
        private actionSheetController: ActionSheetController,
        private userService: UserService
    ) { }

    public filter(): void {
        this.actionSheetController.create({
            header: 'Filtra per regime alimentare',
            buttons: [
                {
                    text: 'Standard',
                    handler: () => {
                        this.router.navigate([], {
                            queryParams: { diet: 'standard' },
                            queryParamsHandling: 'merge'
                        })
                    }
                },
                {
                    text: 'Celiaco',
                    handler: () => {
                        this.router.navigate([], {
                            queryParams: { diet: 'celiac' },
                            queryParamsHandling: 'merge'
                        })
                    }
                },
                {
                    text: 'Vegetariano',
                    handler: () => {
                        this.router.navigate([], {
                            queryParams: { diet: 'vegetarian' },
                            queryParamsHandling: 'merge'
                        })
                    }
                },
                {
                    text: 'Vegano',
                    handler: () => {
                        this.router.navigate([], {
                            queryParams: { diet: 'vegan' },
                            queryParamsHandling: 'merge'
                        })
                    }
                },
                {
                    text: 'Chiudi',
                    role: 'cancel'
                }
            ],
            cssClass: 'diet-filter'
        }).then(actionSheet => {
            actionSheet.present();
        });
    }

    public logout(): void {
        this.userService.logout();
        this.router.navigateByUrl('/login');
    }

}
