import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-books-at-user',
  templateUrl: './books-at-user.component.html',
  styleUrls: ['./books-at-user.component.css']
})
export class BooksAtUserComponent implements OnInit {

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
  }

  booksAtUser(username) {
    return this.booksService.booksAtUser(username);
  }
}
