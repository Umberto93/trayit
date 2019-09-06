import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Logged } from 'src/app/services/guards/logged.service';
import { ProfilePage } from './profile/profile.page';
import { PagesModule } from '../pages.module';
import { FaqsPage } from './faqs/faqs.page';

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
            },
            {
                path: 'faqs',
                canActivate: [Logged],
                component: FaqsPage
            }
        ])
    ],
    declarations: [
        ProfilePage,
        FaqsPage
    ]
})
export class OtherModule { }
