import {Component} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private cookieService: CookieService) {
  }
}
