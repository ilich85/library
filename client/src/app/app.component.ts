import { Component } from '@angular/core';
import {UsersService} from './services/users/users.service';
import {BooksService} from './services/books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService, BooksService]
})
export class AppComponent {
}
