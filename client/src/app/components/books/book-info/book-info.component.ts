import {Component, Input, OnInit} from '@angular/core';
import {BooksService} from '../../../services/books/books.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {QuantityService} from '../../../services/books/quantity.service';
import {StoreService} from '../../../services/users/store.service';
import {LoginService} from '../../../services/users/login.service';
import {DataParserService} from '../../../services/data.parser';
import {Constants} from '../../../constants/constants';
import {MessageConstants} from '../../../constants/message-constants';
import {RouteConstants} from '../../../constants/route-constants';

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

  constructor(private booksService: BooksService, private quantityService: QuantityService,
              private storeService: StoreService, private activatedRoute: ActivatedRoute,
              private loginService: LoginService, private parser: DataParserService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.isbn = params['isbn'];
      });
      this.booksService.getBookByISBN(this.isbn).subscribe(book => {
        this.book = this.parser.parseData(book);
      });
      this.quantityService.getBookQuantity(this.isbn).subscribe(quantity => {
        this.quantity = this.parser.parseData(quantity);
      });
      if (!this.loginService.isAdmin()) {
        this.storeService.getBooksAtUser().subscribe(books => {
          this.booksAtUser = this.parser.parseData(books);
        });
      }
    }
  }

  removeBook() {
    this.booksService.removeBook(this.isbn).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.bookRemoved}`);
          return this.router.navigate([`${RouteConstants.home}`]);
        } else {
          alert(`${MessageConstants.bookNotRemoved}`);
        }
      });
  }

  addToStore() {
    this.storeService.addToStore(this.isbn).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.addedToStore}`);
        }
      });
  }

  removeFromStore() {
    this.storeService.removeFromStore(this.isbn).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.removedFromStore}`);
        }
      });
  }

  isAvailable() {
    return this.quantity.available > 0;
  }

  isInStore() {
    return !!this.booksAtUser.find((book) => book.isbn == this.isbn);
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }
}
