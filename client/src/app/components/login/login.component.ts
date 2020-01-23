import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router, private title: Title,
              private userService: UsersService) {
  }

  user: User = new User();

  ngOnInit() {
    this.title.setTitle('Welcome');
  }

  login() {
     this.userService.check(this.user);
  }
}
