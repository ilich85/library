import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../models/user';
import {LoginService} from '../../services/users/login.service';
import {MessageConstants} from '../../constants/message-constants';
import {RouteConstants} from '../../constants/route-constants';
import {TokenStorage} from '../../auth/token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private user: User = new User();

  constructor(private router: Router, private title: Title,
              private loginService: LoginService, private storage: TokenStorage) {
  }

  ngOnInit() {
    this.title.setTitle('Welcome');
  }

  login() {
    this.loginService.login(this.user).subscribe(
      data => {
        this.storage.saveToken(data.token);
        return this.router.navigate([`${RouteConstants.home}`]);
      },
      err => {
        if (err.status === 401) {
          alert(`${MessageConstants.wrongCredentials}`);
        }
      });
  }
}
