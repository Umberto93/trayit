import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Logged } from 'src/app/services/guards/logged.service';
import { ProfilePage } from './profile/profile.page';
import { PagesModule } from '../pages.module';
import { FaqsPage } from './faqs/faqs.page';
import { AboutPage } from './about/about.page';
import { FeedbackPage } from './feedback/feedback.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
            },
            {
                path: 'about',
                canActivate: [Logged],
                component: AboutPage
            },
            {
                path: 'feedbacks',
                canActivate: [Logged],
                component: FeedbackPage
            }
        ])
    ],
    declarations: [
        ProfilePage,
        FaqsPage,
        AboutPage,
        FeedbackPage
    ]
})
export class OtherModule { }
