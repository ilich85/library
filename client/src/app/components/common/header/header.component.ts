import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  logout() {
    this.cookieService.remove('username');
    this.cookieService.remove('role');
    this.router.navigate(['/']);
  }
}
