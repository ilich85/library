import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Book} from '../../../../models/book';
import {BooksService} from '../../../../services/books/books.service';
import {QuantityService} from '../../../../services/books/quantity.service';
import {Constants} from '../../../../constants/constants';
import {MessageConstants} from '../../../../constants/message-constants';
import {DataParserService} from '../../../../services/data.parser';
import {Router} from '@angular/router';
import {RouteConstants} from '../../../../constants/route-constants';
import {LoginService} from '../../../../services/users/login.service';

@Component({
  selector: 'app-book-add-info',
  templateUrl: './book-add-info.component.html',
  styleUrls: ['./book-add-info.component.css']
})
export class BookAddInfoComponent implements OnInit {

  private book: Book = new Book();
  private quantity;

  constructor(private bookService: BooksService, private  title: Title,
              private quantityService: QuantityService, private router: Router,
              private parser: DataParserService, private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.title.setTitle('Step 1');
    } else {
      this.loginService.logout();
    }
  }

  addInfo() {
    this.bookService.addBookInfo(this.book).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.exists}`) {
          alert(`${MessageConstants.bookExists}`);
          return this.router.navigate([`${RouteConstants.admin}`]);
        }
      });
    this.quantityService.addBookQuantity({
      isbn: this.book.isbn,
      amount: this.quantity,
      available: this.quantity
    }).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          return this.router.navigate([`${RouteConstants.addImage}` + this.book.isbn]);
        } else {
          alert(`${MessageConstants.bookInfoWasNotAdded}`);
        }
      });
  }
}
