import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from '../../../../services/books/books.service';
import {QuantityService} from '../../../../services/books/quantity.service';

@Component({
  selector: 'app-book-edit-info',
  templateUrl: './book-edit-info.component.html',
  styleUrls: ['./book-edit-info.component.css']
})
export class BookEditInfoComponent implements OnInit {

  @Input()
  private isbn;
  private book;
  private quantity = {};

  constructor(private booksService: BooksService, private quantityService: QuantityService) {
  }

  ngOnInit() {
    this.booksService.getBookByISBN(this.isbn).subscribe(book => {
      this.book = book.json();
    });
    this.quantityService.getBookQuantity(this.isbn).subscribe(quantity => {
      this.quantity = quantity.json();
    });
  }

  updateInfo() {
    this.booksService.updateBookInfo(this.book);
    this.quantityService.updateBookQuantity(this.quantity);
  }
}
