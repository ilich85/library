import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from '../../../services/books/books.service';
import {ActivatedRoute, Params} from '@angular/router';
import {QuantityService} from '../../../services/books/quantity.service';
import {StoreService} from '../../../services/users/store.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  @Input()
  private book;
  private booksAtUser = [];
  private isbn;
  private quantity;

  constructor(private booksService: BooksService,
              private quantityService: QuantityService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isbn = params['isbn'];
    });
    this.booksService.getBookByISBN(this.isbn).subscribe(book => {
      this.book = book.json();
    });
    this.quantityService.getBookQuantity(this.isbn).subscribe(quantity => {
      this.quantity = quantity.json();
    });
    this.storeService.getBooksAtUser().subscribe(books => {
      this.booksAtUser.push(books.json());
    });
  }

  removeBook() {
    this.booksService.removeBook(this.isbn);
  }

  addToStore() {
    this.storeService.addToStore(this.isbn);
  }

  removeFromStore() {
    this.storeService.removeFromStore(this.isbn);
  }

  isAvailable() {
    return this.quantity.available > 0;
  }

  isInStore() {
    return !!this.booksAtUser[0].find((book) => book.isbn == this.isbn);
  }
}
