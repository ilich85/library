import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) {
  }

  changePassword(username, oldPassword, newPassword) {
    return this.http.put(`${Constants.hostUrl}${Constants.password}${Constants.cgange}`,
      {username, oldPassword, newPassword});
  }

  resetPassword(username) {
    return this.http.put(`${Constants.hostUrl}${Constants.password}${Constants.reset}`, username);
  }
}
