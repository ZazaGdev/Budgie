import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { HomeComponent } from './components/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/login' },
];
