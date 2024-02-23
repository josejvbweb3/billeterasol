import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => 
            import('./balance-page.component').then((m) => m.BalancePageComponent),
    },
    {
        path: 'collectibles',
        loadComponent: () => 
            import('./collectibles-page.component').then((m) => m.CollectiblesPageComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },

];
