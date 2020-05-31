import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';
import {TokenStorage} from '../../auth/token.storage';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient, private storage: TokenStorage) {
  }

  getBooksAtUser() {
    return this.http.get(`${Constants.hostUrl}${Constants.store}` + this.storage.getUserName());
  }

  addToStore(isbn) {
    return this.http.post(`${Constants.hostUrl}${Constants.store}` + isbn, this.storage.getUserName());
  }

  removeFromStore(isbn) {
    return this.http.put(`${Constants.hostUrl}${Constants.store}` + isbn, this.storage.getUserName());
  }
}
