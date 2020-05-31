import {Component, OnInit} from '@angular/core';
import {BooksService} from '../../../services/books/books.service';
import {Book} from '../../../models/book';
import {DataParserService} from '../../../services/data.parser';

@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  private books: Book[];

  constructor(private booksService: BooksService, private parser: DataParserService) {
  }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(books => {
      this.books = this.parser.parseData(books);
    });
  }
}
