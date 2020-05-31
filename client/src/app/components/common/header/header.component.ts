import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/users/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private loginService: LoginService) {
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }

  logout() {
    this.loginService.logout();
  }
}
