import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../../services/books/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  private books = [];

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(books => {
      this.books = books.json();
    });
  }
}
