import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../models/user';
import {UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private user: User = new User();

  constructor(private router: Router, private title: Title,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.title.setTitle('Welcome');
  }

  login() {
    this.userService.check(this.user);
  }
}
