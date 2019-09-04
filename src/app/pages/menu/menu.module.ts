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
import { FooterComponent } from '../footer/footer.component';
import { SummaryPage } from './summary/summarypage';
import { MorePopoverComponent } from '../footer/more-popover/more-popover.component';

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
        HeaderComponent,
        FooterComponent,
        SelectionPage,
        CompositionPage,
        SummaryPage,
        RatingComponent,
        CounterPopoverComponent,
        MorePopoverComponent
    ],
    entryComponents: [
        CounterPopoverComponent,
        MorePopoverComponent
    ]
})
export class MenuModule { }
