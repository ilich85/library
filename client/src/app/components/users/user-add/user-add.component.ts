import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users/users.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  private user: User = new User();

  constructor(private router: Router, private title: Title,
              private userService: UsersService) {
  }

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
