import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class UsersService {

  constructor(private http: Http, private router: Router, private cookieService: CookieService) {
  }

  check(user) {
    this.http.post('http://localhost:8080/login', user).subscribe(
      res => {
        if (res.json().result === 'fail') {
          alert('Incorrect username or password.');
        } else {
          this.cookieService.put('username', res.json().username);
          this.cookieService.put('role', res.json().role);
          return this.router.navigate(['/home']);
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  getUsers() {
    return this.http.get('http://localhost:8080/users');
  }

  getUser(username) {
    return this.http.get('http://localhost:8080/users/' + username)
  }


  register(user) {
    this.http.post('http://localhost:8080/users', user).subscribe(
      res => {
        if (res.text() === 'success') {
          alert('User created successfully.');
          return this.router.navigate(['/user-add']);
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  updatePass(pass) {
    this.http.put('http://localhost:8080/users/' + this.cookieService.get('currentUser'), pass).subscribe(
      res => {
        if (res.text() === 'success') {
          alert('Password updated.');
        } else if (res.text() === 'fail') {
          alert('Incorrect password');
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }

  delete() {
    this.http.delete('http://localhost:8080/users/' + this.cookieService.get('currentUser')).subscribe(
      res => {
        if (res.text() === 'success') {
          alert('User was deleted.');
          return this.router.navigate(['/']);
        }
      },
      err => {
        alert('Server error. Please try again later.');
        return err;
      });
  }
}
