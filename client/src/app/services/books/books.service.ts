import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getAllBooks() {
    return this.http.get(`${Constants.hostUrl}${Constants.books}`);
  }

  getBookByISBN(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.books}/` + isbn);
  }

  addBookInfo(book) {
    return this.http.post(`${Constants.hostUrl}${Constants.books}`, book);
  }

  updateBookInfo(book) {
    return this.http.put(`${Constants.hostUrl}${Constants.books}`, book);
  }

  removeBook(isbn) {
    return this.http.delete(`${Constants.hostUrl}${Constants.books}`, isbn);
  }
}


