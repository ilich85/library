import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class QuantityService {

  constructor(private http: HttpClient) {
  }

  getBookQuantity(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.quantity}/` + isbn);
  }

  addBookQuantity(quantity) {
    return this.http.post(`${Constants.hostUrl}${Constants.quantity}`, quantity);
  }

  updateBookQuantity(quantity) {
    return this.http.put(`${Constants.hostUrl}${Constants.quantity}`, quantity);
  }
}
