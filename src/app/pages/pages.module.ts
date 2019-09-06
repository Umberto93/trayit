import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MorePopoverComponent } from './footer/more-popover/more-popover.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        MorePopoverComponent
    ],
    entryComponents: [
        MorePopoverComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
})
export class PagesModule { }
