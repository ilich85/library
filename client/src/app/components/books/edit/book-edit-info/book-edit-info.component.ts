import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from '../../../../services/books/books.service';
import {QuantityService} from '../../../../services/books/quantity.service';
import {Constants} from '../../../../constants/constants';
import {MessageConstants} from '../../../../constants/message-constants';
import {LoginService} from '../../../../services/users/login.service';
import {DataParserService} from '../../../../services/data.parser';

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

  constructor(private booksService: BooksService, private quantityService: QuantityService,
              private loginService: LoginService, private parser: DataParserService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.booksService.getBookByISBN(this.isbn).subscribe(book => {
        this.book = this.parser.parseData(book);
      });
      this.quantityService.getBookQuantity(this.isbn).subscribe(quantity => {
        this.quantity = this.parser.parseData(quantity);
      });
    } else {
      this.loginService.logout();
    }
  }

  updateInfo() {
    this.booksService.updateBookInfo(this.book).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result !== `${Constants.success}`) {
          alert(`${MessageConstants.serverError}`);
        }
      });
    this.quantityService.updateBookQuantity(this.quantity).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.bookInfoUpdated}`);
        } else {
          alert(`${MessageConstants.bookInfoWasNotUpdated}`);
        }
      });
  }
}
