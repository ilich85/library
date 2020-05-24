import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {MessageConstants} from '../../constants/message-constants';
import {RouteConstants} from '../../constants/route-constants';

@Injectable()
export class QuantityService {

  constructor(private http: Http, private router: Router) {
  }

  getBookQuantity(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.quantity}/` + isbn);
  }

  addBookQuantity(quantity) {
    this.http.post(`${Constants.hostUrl}${Constants.quantity}`, quantity).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          return this.router.navigate([`${RouteConstants.addImage}` + quantity.isbn]);
        } else {
          alert(`${MessageConstants.bookInfoWasNotAdded}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  updateBookQuantity(quantity) {
    this.http.put(`${Constants.hostUrl}${Constants.quantity}`, quantity).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.bookInfoUpdated}`);
        } else {
          alert(`${MessageConstants.bookInfoWasNotUpdated}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }
}


