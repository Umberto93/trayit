import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundPage } from './not-found.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [NotFoundPage],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: NotFoundPage
            }
        ])
    ]
})
export class NotFoundModule { }
