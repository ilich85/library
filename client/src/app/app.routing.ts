import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {UserAddComponent} from "./components/user-add/user-add.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {BooksListComponent} from "./components/books-list/books-list.component";

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user-add', component: UserAddComponent},
  {path: 'users-list', component: UsersListComponent},
  {path: 'books-list', component: BooksListComponent},
  {path: '**', redirectTo: '/'}
];
export const routing = RouterModule.forRoot(appRoutes);
