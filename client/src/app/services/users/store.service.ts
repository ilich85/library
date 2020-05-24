import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {MessageConstants} from '../../constants/message-constants';

@Injectable()
export class StoreService {

  username = '1234567';

  constructor(private http: Http) {
  }

  getBooksAtUser() {
    return this.http.get(`${Constants.hostUrl}${Constants.store}` + this.username);
  }

  addToStore(isbn) {
    this.http.post(`${Constants.hostUrl}${Constants.store}` + isbn, this.username).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.addedToStore}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  removeFromStore(isbn) {
    this.http.put(`${Constants.hostUrl}${Constants.store}` + isbn, this.username).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.removedFromStore}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }
}
