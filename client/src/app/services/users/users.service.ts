import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Constants} from '../../constants/constants';
import {RouteConstants} from '../../constants/route-constants';
import {MessageConstants} from '../../constants/message-constants';

@Injectable()
export class UsersService {

  constructor(private http: Http, private router: Router, private cookieService: CookieService) {
  }

  check(user) {
    this.http.post(`${Constants.hostUrl}${Constants.login}`, user).subscribe(
      res => {
        if (res.json().result === `${Constants.fail}`) {
          alert(`${MessageConstants.wrongCredentials}`);
        } else {
          /*this.cookieService.put('username', res.json().username);
          this.cookieService.put('role', res.json().role);*/
          return this.router.navigate([`${RouteConstants.home}`]);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  getUsers() {
    return this.http.get(`${Constants.hostUrl}${Constants.users}`);
  }

  register(user) {
    this.http.post(`${Constants.hostUrl}${Constants.users}`, user).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.userCreated}`);
        } else if (res.text() === `${Constants.exists}`) {
          alert(`${MessageConstants.userExists}`);
        }
        return this.router.navigate([`${RouteConstants.userAdd}`]);
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  removeUser(username) {
    this.http.put(`${Constants.hostUrl}${Constants.store}${Constants.clear}`, username).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          this.removeUserAfterRemoveBooksFromStore(username);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  removeUserAfterRemoveBooksFromStore(username) {
    this.http.delete(`${Constants.hostUrl}${Constants.users}/` + username).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.userRemoved}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }
}
