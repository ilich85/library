import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from "@angular/common/http";
import {BaseCookieOptions, CookieService, CookieOptions} from 'angular2-cookie';
import {BooksService} from "./services/books.service";
import {UsersService} from "./services/users.service";
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {NavComponent} from './components/nav/nav.component';
import {BookComponent} from './components/book/book.component';
import {BooksListComponent} from './components/books-list/books-list.component';
import {BookAddComponent} from './components/book-add/book-add.component';
import {BookEditComponent} from './components/book-edit/book-edit.component';
import {UserComponent} from "./components/user/user.component";
import {UsersListComponent} from './components/users-list/users-list.component';
import {UserAddComponent} from './components/user-add/user-add.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import { BooksAtUserComponent } from './components/books-at-user/books-at-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    BookComponent,
    BooksListComponent,
    BookAddComponent,
    BookEditComponent,
    UserComponent,
    UsersListComponent,
    UserAddComponent,
    UserEditComponent,
    BooksAtUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [{provide: CookieOptions, useClass: BaseCookieOptions},
    CookieService, BooksService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
