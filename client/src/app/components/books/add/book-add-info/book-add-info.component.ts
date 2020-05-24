import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Book} from '../../../../models/book';
import {BooksService} from '../../../../services/books/books.service';
import {QuantityService} from '../../../../services/books/quantity.service';

@Component({
  selector: 'app-book-add-info',
  templateUrl: './book-add-info.component.html',
  styleUrls: ['./book-add-info.component.css']
})
export class BookAddInfoComponent implements OnInit {

  private book: Book = new Book();
  private quantity;

  constructor(private bookService: BooksService, private  title: Title,
              private quantityService: QuantityService) {
  }

  ngOnInit() {
    this.title.setTitle('Step 1');
  }

  addInfo() {
    this.bookService.addBookInfo(this.book);
    this.quantityService.addBookQuantity({
      isbn: this.book.isbn,
      amount: this.quantity,
      available: this.quantity
    });
  }
}
