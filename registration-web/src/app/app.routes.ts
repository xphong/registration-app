import { Routes, RouterModule } from '@angular/router';

import { About } from './about/about';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { User } from './admin/user/user';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'about', component: About },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'admin/user', component: User },
  { path: '**',    component: Home }
];
