import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SelectionPage } from './selection/selection.component';
import { HeaderComponent } from '../header/header.component';
import { Logged } from 'src/app/services/guards/logged.service';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                canActivate: [Logged],
                children: [
                    {
                        path: '',
                        redirectTo: 'selection'
                    },
                    {
                        path: 'selection',
                        pathMatch: 'full',
                        component: SelectionPage
                    }
                ]
            }
        ])
    ],
    declarations: [
        HeaderComponent,
        SelectionPage
    ]
})
export class MenuModule { }
