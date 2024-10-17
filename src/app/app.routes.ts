import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'autoServicio',
        loadComponent: () => import('./autoServicio/pages/autoServicioPage/autoServicioPage.component')
    },
    {
        path: '**',
        redirectTo: 'autoServicio'
    }
];
