import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/common/header/header.component';
import {BookComponent} from './components/books/book/book.component';
import {BookInfoComponent} from './components/books/book-info/book-info.component';
import {BookAddFileComponent} from './components/books/add/book-add-file/book-add-file.component';
import {BookAddImageComponent} from './components/books/add/book-add-image/book-add-image.component';
import {BookAddInfoComponent} from './components/books/add/book-add-info/book-add-info.component';
import {BooksListComponent} from './components/books/books-list/books-list.component';
import {BookEditComponent} from './components/books/edit/book-edit/book-edit.component';
import {BookEditFileComponent} from './components/books/edit/book-edit-file/book-edit-file.component';
import {BookEditImageComponent} from './components/books/edit/book-edit-image/book-edit-image.component';
import {BookEditInfoComponent} from './components/books/edit/book-edit-info/book-edit-info.component';
import {BookReadComponent} from './components/books/book-read/book-read.component';
import {ImageComponent} from './components/books/image/image.component';
import {UserProfileComponent} from './components/users/user-profile/user-profile.component';
import {UserAddComponent} from './components/users/user-add/user-add.component';
import {UserPasswordChangeComponent} from './components/users/user-password-change/user-password-change.component';
import {UsersListComponent} from './components/users/users-list/users-list.component';
import {BooksService} from './services/books/books.service';
import {AdminComponent} from './components/admin/admin.component';
import {UsersService} from './services/users/users.service';
import {FileService} from './services/books/files.service';
import {PasswordService} from './services/users/password.service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {StoreService} from './services/users/store.service';
import {QuantityService} from './services/books/quantity.service';
import {ImagesService} from './services/books/images.service';
import {LoginService} from './services/users/login.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {TokenStorage} from './auth/token.storage';
import {DataParserService} from './services/data.parser';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    BookComponent,
    BookAddFileComponent,
    BookAddInfoComponent,
    BookEditComponent,
    BooksListComponent,
    UserProfileComponent,
    UserAddComponent,
    UserPasswordChangeComponent,
    UsersListComponent,
    AdminComponent,
    BookAddImageComponent,
    BookEditFileComponent,
    BookEditImageComponent,
    BookEditInfoComponent,
    BookReadComponent,
    BookInfoComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    PdfViewerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    BooksService, QuantityService, ImagesService, FileService, TokenStorage,
    LoginService, UsersService, PasswordService, StoreService, DataParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
