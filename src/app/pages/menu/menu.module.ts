import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SelectionPage } from './selection/selection.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
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
