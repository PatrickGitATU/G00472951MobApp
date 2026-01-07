import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'recipe-details',
    loadComponent: () => import('./recipe-details/recipe-details.page').then( m => m.RecipeDetailsPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'favourite',
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },
];
