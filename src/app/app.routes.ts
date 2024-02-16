import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => 
            import('./tokens-page.component').then((m) => m.TokensPageComponent),
    },
    {
        path: 'activity',
        loadComponent: () => 
            import('./activity-page.component').then((m) => m.ActivityPageComponent),
    },
    {
        path: '**',
        redirectTo: '',
    },

];
