import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Logged } from 'src/app/services/guards/logged.service';
import { ProfilePage } from './profile/profile.page';
import { PagesModule } from '../pages.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        PagesModule,
        RouterModule.forChild([
            {
                path: 'me',
                canActivate: [Logged],
                component: ProfilePage
            }
        ])
    ],
    declarations: [
        ProfilePage
    ]
})
export class OtherModule { }
