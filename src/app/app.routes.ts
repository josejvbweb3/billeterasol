import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => 
            import('./pages/balance-page.component').then((m) => m.BalancePageComponent),
    },
    {
        path: 'collectibles',
        loadComponent: () => 
            import('./pages/collectibles-page.component').then((m) => m.CollectiblesPageComponent),
    },
    {
        path: 'activity',
        loadComponent: () => 
            import('./pages/activity-page.component').then((m) => m.ActivityPageComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },

];
