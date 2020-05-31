import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';
import {RouteConstants} from '../../constants/route-constants';
import {Observable} from 'rxjs/Observable';
import {TokenStorage} from '../../auth/token.storage';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private storage: TokenStorage,
              private router: Router) {
  }

  login(user): Observable<any> {
    return this.http.post(`${Constants.hostUrl}${Constants.login}`,
      {'username': user.username, 'password': user.password});
  }

  isLoggedIn(): boolean {
    return this.storage.getToken() !== null;
  }

  isAdmin(): boolean {
    return this.storage.getUserRoles().includes('ROLE_ADMIN');
  }

  logout() {
    this.storage.signOut();
    this.router.navigate([`${RouteConstants.login}`]);
  }
}
