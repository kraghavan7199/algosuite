import { Routes } from '@angular/router';
import { MasterPublicComponent } from './master-public.component';
import { LandingPageComponent } from './landing-page.component';
import { AuthComponent } from './auth/auth.component';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        component: MasterPublicComponent,
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'landing'
            },
            {
                path: 'landing', loadComponent: () => import('./landing-page.component').then(m => LandingPageComponent)
            },
            {
                path: 'auth', loadComponent: () => import('./auth/auth.component').then(m => AuthComponent)
            },
            {
                path: 'docs', loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent)
            }
        ]
    }
];