import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class BooksService {

  constructor(private http: Http, private router: Router) {

  }

  getAllBooks() {
    return this.http.get('http://localhost:8080/books');
  }

  getBookByISBN(isbn) {
   return  this.http.get('http://localhost:8080/books/' + isbn);
  }

  readBook(isbn) {
    this.http.get('http://localhost:8080/books/' + isbn + '/read').subscribe(
      res => {
        console.log(res);
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  addBook(book) {
    this.http.post('http://localhost:8080/books', book).subscribe(
      res => {
        if (res.text() ==="success"){
          alert("Book was added successfully");
        }else {
          alert("Book was not added");
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  updateBook(book) {
    this.http.put('http://localhost:8080/books/' + book.isbn, book).subscribe(
      res => {
        if (res.text() ==="success"){
          alert("Book was updated successfully");
        }else {
          alert("Book was not updated");
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  removeBook(isbn) {
    this.http.delete('http://localhost:8080/books/' + isbn).subscribe(
      res => {
        if (res.text() ==="success"){
          alert("Book was removed successfully");
        }else {
          alert("Book was not removed");
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  booksAtUser(username) {
   return this.http.get('http://localhost:8080/books/at_user/' + username);
  }
}
