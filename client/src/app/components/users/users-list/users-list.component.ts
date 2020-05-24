import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../../../services/users/users.service';
import {PasswordService} from '../../../services/users/password.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users = [];

  constructor(private usersService: UsersService,
              private passwordService: PasswordService, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Users');
    this.usersService.getUsers().subscribe(users => {
      this.users = users.json();
    });
  }

  resetPassword(username) {
    this.passwordService.resetPassword(username);
  }

  removeUser(username) {
    this.usersService.removeUser(username);
  }
}
