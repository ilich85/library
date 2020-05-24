import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {MessageConstants} from '../../constants/message-constants';
import {RouteConstants} from '../../constants/route-constants';

@Injectable()
export class BooksService {

  constructor(private http: Http, private router: Router) {
  }

  getAllBooks() {
    return this.http.get(`${Constants.hostUrl}${Constants.books}`);
  }

  getBookByISBN(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.books}/` + isbn);
  }

  addBookInfo(book) {
    this.http.post(`${Constants.hostUrl}${Constants.books}`, book).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          return;
        } else {
          alert(`${MessageConstants.bookInfoWasNotAdded}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  updateBookInfo(book) {
    this.http.put(`${Constants.hostUrl}${Constants.books}`, book).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          return;
        } else {
          alert(`${MessageConstants.bookInfoWasNotUpdated}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  removeBook(isbn) {
    this.http.delete(`${Constants.hostUrl}${Constants.books}`, isbn).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.bookRemoved}`);
        } else {
          alert(`${MessageConstants.bookNotRemoved}`);
        }
        return this.router.navigate([`${RouteConstants.home}`]);
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }
}


