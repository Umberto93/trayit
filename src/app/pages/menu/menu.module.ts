import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Logged } from 'src/app/services/guards/logged.service';
import { HeaderComponent } from '../header/header.component';
import { SelectionPage } from './selection/selection.page';
import { CompositionPage } from './composition/composition.page';
import { RatingComponent } from '../../components/rating/rating.component';
import { CounterPopoverComponent } from './composition/counter-popover/counter-popover.component';

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
                    },
                    {
                        path: 'composition',
                        pathMatch: 'full',
                        component: CompositionPage
                    }
                ]
            }
        ])
    ],
    declarations: [
        HeaderComponent,
        SelectionPage,
        CompositionPage,
        RatingComponent,
        CounterPopoverComponent
    ],
    entryComponents: [
        CounterPopoverComponent
    ]
})
export class MenuModule { }
