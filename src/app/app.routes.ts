import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CategoryPageComponent } from './pages/category/category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'category/:categoryName', component: CategoryPageComponent },
  { path: '**', redirectTo: '' },
];
