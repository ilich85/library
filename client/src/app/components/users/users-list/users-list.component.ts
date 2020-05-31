import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../../../services/users/users.service';
import {PasswordService} from '../../../services/users/password.service';
import {Constants} from '../../../constants/constants';
import {MessageConstants} from '../../../constants/message-constants';
import {DataParserService} from '../../../services/data.parser';
import {LoginService} from '../../../services/users/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private users = [];

  constructor(private usersService: UsersService, private parser: DataParserService,
              private passwordService: PasswordService, private title: Title,
              private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.title.setTitle('Users');
      this.usersService.getUsers().subscribe(users => {
        this.users = this.parser.parseData(users);
      });
    } else {
      this.loginService.logout();
    }
  }

  resetPassword(username) {
    this.passwordService.resetPassword(username)
      .subscribe(
        res => {
          const response = this.parser.parseData(res);
          if (response.result === `${Constants.success}`) {
            alert(`${MessageConstants.passwordReseted}`);
          }
        });
  }

  removeUser(username) {
    this.usersService.removeUser(username).subscribe(
      res => {
        console.log(res);
        const response = this.parser.parseData(res);
        if (response.result !== `${Constants.success}`) {
          alert(`${MessageConstants.serverError}`);
        }
      });
    this.usersService.removeUserAfterRemoveBooksFromStore(username).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.userRemoved}`);
        }
      });
  }
}
