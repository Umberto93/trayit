import { Component, OnInit, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/server/user.service';
import { User } from 'src/app/interfaces/user';
import { CategoryService } from 'src/app/services/server/category.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['../other.component.scss', './profile.page.scss'],
})
export class ProfilePage {

    user: User;
    category: string;

    constructor(
        private userService: UserService,
        private categoryService: CategoryService
    ) {
        this.user = {} as User;
        this.category = '';
    }

    public ionViewWillEnter(): void {
        this.userService.getProfile().subscribe(user => {
            this.user = user;
            this.categoryService.getCategory(user.category).subscribe(category => {
                this.category = category.name;
            });
        });
    }

    public updateDiet(diet: string): void {
        if (diet !== this.user.diet) {
            this.userService.editProfile(this.user.id, {
                diet: diet
            }).subscribe();
        }
    }

}
