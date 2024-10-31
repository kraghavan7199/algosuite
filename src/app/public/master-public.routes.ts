import { Routes } from '@angular/router';
import { MasterPublicComponent } from './master-public.component';
import { LandingPageComponent } from '../landing-page.component';
import { AuthComponent } from './auth/auth.component';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        component: MasterPublicComponent,
        children: [
            {
                path: 'auth', loadComponent: () => import('./auth/auth.component').then(m => AuthComponent)
            },
            {
                path: 'docs', loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent)
            },
            {
                path: 'shortcuts', loadComponent: () => import('./shortcuts/shortcuts.component').then(m => m.ShortcutsComponent)
            }
        ]
    }
];