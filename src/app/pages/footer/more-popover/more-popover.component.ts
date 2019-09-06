import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/client/storage.service';
import { Router, NavigationStart } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/services/server/user.service';

@Component({
    selector: 'app-more-popover',
    templateUrl: './more-popover.component.html',
    styleUrls: ['./more-popover.component.scss'],
})
export class MorePopoverComponent {

    constructor(
        private router: Router,
        private userService: UserService,
        private popoverController: PopoverController
    ) { }

    public logout(): void {
        this.userService.logout();
        this.router.navigateByUrl('/');
    }

    public dismissPopover() {
        this.popoverController.dismiss();
    }

}
