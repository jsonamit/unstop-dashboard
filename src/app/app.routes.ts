import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard
    { path: '**', redirectTo: '/dashboard' } // Handle unknown routes
];
