import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../../services/users/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private title: Title, private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.title.setTitle('Home');
    } else {
      this.loginService.logout();
    }
  }
}
