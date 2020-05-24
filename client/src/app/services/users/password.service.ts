import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Constants} from '../../constants/constants';
import {RouteConstants} from '../../constants/route-constants';
import {MessageConstants} from '../../constants/message-constants';

@Injectable()
export class PasswordService {

  constructor(private http: Http, private router: Router, private cookieService: CookieService) {
  }

  changePassword(username, oldPassword, newPassword) {
    this.http.put(`${Constants.hostUrl}${Constants.password}${Constants.cgange}`,
      {username, oldPassword, newPassword})
      .subscribe(
        res => {
          if (res.text() === `${Constants.success}`) {
            alert(`${MessageConstants.passwordUpdated}`);
            return this.router.navigate([`${RouteConstants.userProfile}`]);
          } else if (res.text() === `${Constants.incorrect}`) {
            alert(`${MessageConstants.incorrectPassword}`);
            return this.router.navigate([`${RouteConstants.changePassword}`]);
          }
        },
        err => {
          alert(`${MessageConstants.serverError}`);
          return err;
        });
  }

  resetPassword(username) {
    this.http.put(`${Constants.hostUrl}${Constants.password}${Constants.reset}`, username)
      .subscribe(
        res => {
          if (res.text() === `${Constants.success}`) {
            alert(`${MessageConstants.passwordReseted}`);
          }
        },
        err => {
          alert(`${MessageConstants.serverError}`);
          return err;
        });
  }
}
