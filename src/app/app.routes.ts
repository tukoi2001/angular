import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up-page.routes').then(m => m.SIGN_UP_ROUTES),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES),
  },
];
