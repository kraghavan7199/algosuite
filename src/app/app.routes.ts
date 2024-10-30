import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { PUBLIC_ROUTES } from './public/master-public.routes';
import { PRIVATE_ROUTES } from './private/master-private.routes';

export const routes: Routes = [
    {
      path: '',
      children: PUBLIC_ROUTES
    },
    {
      path: 'private',
      canActivate: [authGuard],
      children: PRIVATE_ROUTES
    }
  ];