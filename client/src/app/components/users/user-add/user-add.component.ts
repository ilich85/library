import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../../models/user';
import {UsersService} from '../../../services/users/users.service';
import {Constants} from '../../../constants/constants';
import {MessageConstants} from '../../../constants/message-constants';
import {RouteConstants} from '../../../constants/route-constants';
import {DataParserService} from '../../../services/data.parser';
import {LoginService} from '../../../services/users/login.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  private user: User = new User();

  constructor(private router: Router, private title: Title,
              private userService: UsersService, private parser: DataParserService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.title.setTitle('User registration');
      this.user.username = '';
      this.user.password = '';
      this.user.role = 'USER';
    } else {
      this.loginService.logout();
    }
  }

  register() {
    if ((this.user.username.length < 6 || this.user.username.length > 25)
      || (this.user.password.length < 6 || this.user.password.length > 25)) {
      alert('Incorrect data');
    } else {
      this.userService.register(this.user).subscribe(
        res => {
          const response = this.parser.parseData(res);
          if (response.result === `${Constants.success}`) {
            alert(`${MessageConstants.userCreated}`);
          } else if (response.result === `${Constants.exists}`) {
            alert(`${MessageConstants.userExists}`);
          }
          return this.router.navigate([`${RouteConstants.userAdd}`]);
        });
    }
  }
}
