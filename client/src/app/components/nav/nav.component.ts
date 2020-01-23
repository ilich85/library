import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router, private cookieService: CookieService) {
  }

  exit() {
    this.cookieService.remove('username');
    this.cookieService.remove('role');
    this.router.navigate(['/']);
  }
}
