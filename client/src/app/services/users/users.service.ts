import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get(`${Constants.hostUrl}${Constants.users}`);
  }

  register(user) {
    return this.http.post(`${Constants.hostUrl}${Constants.users}`, user);
  }

  removeUser(username) {
    return this.http.put(`${Constants.hostUrl}${Constants.store}${Constants.clear}`, username);
  }

  removeUserAfterRemoveBooksFromStore(username) {
    return this.http.delete(`${Constants.hostUrl}${Constants.users}/` + username);
  }
}
