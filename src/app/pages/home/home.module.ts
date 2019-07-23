import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { Guest } from 'src/app/services/guards/guest.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                canActivate: [Guest],
                children: [
                    {
                        path: '',
                        redirectTo: 'login'
                    },
                    {
                        path: 'login',
                        pathMatch: 'full',
                        canActivate: [Guest],
                        component: LoginPage
                    },
                    {
                        path: 'signup',
                        pathMatch: 'full',
                        canActivate: [Guest],
                        component: SignupPage
                    }
                ]
            }

        ])
    ],
    declarations: [
        LoginPage,
        SignupPage
    ]
})
export class HomePageModule { }
