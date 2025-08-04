import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/drink/drink.component').then(m => m.DrinkComponent),
        data: { transparentNavbar: true }
    },
    {
        path: 'drink/:id',
        loadComponent: () => import('./pages/drink-details/drink-details.component').then(m => m.DrinkDetailsComponent),
        data: { transparentNavbar: false }
    },
    { path: '**', redirectTo: '' }
];
