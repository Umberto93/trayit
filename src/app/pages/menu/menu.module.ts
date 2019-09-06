import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Logged } from 'src/app/services/guards/logged.service';
import { SelectionPage } from './selection/selection.page';
import { CompositionPage } from './composition/composition.page';
import { RatingComponent } from '../../components/rating/rating.component';
import { CounterPopoverComponent } from './composition/counter-popover/counter-popover.component';
import { SummaryPage } from './summary/summarypage';
import { MorePopoverComponent } from 'src/app/pages/footer/more-popover/more-popover.component';
import { PagesModule } from '../pages.module';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        PagesModule,
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
                    },
                    {
                        path: 'summary',
                        pathMatch: 'full',
                        component: SummaryPage
                    }
                ]
            }
        ])
    ],
    declarations: [
        SelectionPage,
        CompositionPage,
        SummaryPage,
        RatingComponent,
        CounterPopoverComponent
    ],
    entryComponents: [
        CounterPopoverComponent
    ]
})
export class MenuModule { }
