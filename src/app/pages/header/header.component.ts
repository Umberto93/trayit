import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/server/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() title: string;

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    public logout(): void {
        this.userService.logout();
        this.router.navigateByUrl('/login');
    }

}
