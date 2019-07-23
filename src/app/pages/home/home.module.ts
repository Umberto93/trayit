import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'login'
            },
            {
                path: 'login',
                pathMatch: 'full',
                component: LoginPage
            },
            {
                path: 'signup',
                pathMatch: 'full',
                component: SignupPage
            }
        ])
    ],
    declarations: [
        LoginPage,
        SignupPage
    ]
})
export class HomePageModule { }
