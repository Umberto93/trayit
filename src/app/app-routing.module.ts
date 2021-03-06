import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './pages/home/home.module#HomePageModule' },
    { path: '', loadChildren: './pages/other/other.module#OtherModule' },
    { path: 'menu', loadChildren: './pages/menu/menu.module#MenuModule' },
    { path: '**', loadChildren: './pages/errors/not-found/not-found.module#NotFoundModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
