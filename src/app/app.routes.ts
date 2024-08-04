import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: ()=> import('../app/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: ()=> import('../app/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('../app/template/layout/layout.component').then(m => m.LayoutComponent),
    children: [
        {
            path: 'home',
            loadComponent: () => import('../app/components/home/home.component').then(m => m.HomeComponent)
        },
        // {
        //     path: 'profile',
        //     loadComponent: () => import('./business/profile/profile.component')
        // },
        // {
        //     path: 'tables',
        //     loadComponent: () => import('./business/tables/tables.component')
        // },
        // {
        //     path: '',
        //     redirectTo: 'dashboard',
        //     pathMatch: 'full'
        // },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
}
];
