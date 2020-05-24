import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {BooksListComponent} from './components/books/books-list/books-list.component';
import {UserAddComponent} from './components/users/user-add/user-add.component';
import {UsersListComponent} from './components/users/users-list/users-list.component';
import {UserProfileComponent} from './components/users/user-profile/user-profile.component';
import {AdminComponent} from './components/admin/admin.component';
import {UserPasswordChangeComponent} from './components/users/user-password-change/user-password-change.component';
import {BookAddFileComponent} from './components/books/add/book-add-file/book-add-file.component';
import {BookAddImageComponent} from './components/books/add/book-add-image/book-add-image.component';
import {BookAddInfoComponent} from './components/books/add/book-add-info/book-add-info.component';
import {BookReadComponent} from './components/books/book-read/book-read.component';
import {BookEditComponent} from './components/books/edit/book-edit/book-edit.component';
import {BookInfoComponent} from './components/books/book-info/book-info.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'book-add-file/:isbn', component: BookAddFileComponent},
  {path: 'book-add-image/:isbn', component: BookAddImageComponent},
  {path: 'book-add-info', component: BookAddInfoComponent},
  {path: 'book-info/:isbn', component: BookInfoComponent},
  {path: 'book-edit/:isbn', component: BookEditComponent},
  {path: 'books-list', component: BooksListComponent},
  {path: 'book-read/:isbn', component: BookReadComponent},
  {path: 'change-password', component: UserPasswordChangeComponent},
  {path: 'user-add', component: UserAddComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'users-list', component: UsersListComponent},
  {path: '**', redirectTo: '/'}
];
export const routing = RouterModule.forRoot(appRoutes);
