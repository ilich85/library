import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LoginService} from '../../services/users/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private title: Title, private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.title.setTitle('Admin');
    } else {
      this.loginService.logout();
    }
  }
}
