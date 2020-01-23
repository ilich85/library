import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements  OnInit {

  constructor(private router: Router, private title: Title,
              private userService: UsersService) {
  }

  user: User = new User();

  ngOnInit() {
    this.title.setTitle('User registration');
    this.user.username = '';
    this.user.password = '';
    this.user.role = 'user';
  }

  register() {
    if ((this.user.username.length < 6 || this.user.username.length > 25)
      || (this.user.password.length < 6 || this.user.password.length > 25)) {
      alert('Incorrect data');
    } else {
      this.userService.register(this.user);
    }
  }

}
