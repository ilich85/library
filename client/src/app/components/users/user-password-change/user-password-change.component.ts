import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PasswordService} from '../../../services/users/password.service';
import {Constants} from '../../../constants/constants';
import {MessageConstants} from '../../../constants/message-constants';
import {RouteConstants} from '../../../constants/route-constants';
import {LoginService} from '../../../services/users/login.service';
import {TokenStorage} from '../../../auth/token.storage';
import {DataParserService} from '../../../services/data.parser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent implements OnInit {

  private oldPassword;
  private newPassword;
  private repeatPassword;

  constructor(private title: Title, private passwordService: PasswordService,
              private loginService: LoginService, private storage: TokenStorage,
              private parser: DataParserService, private router: Router) {
  }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.title.setTitle('Change Password');
      this.oldPassword = '';
      this.newPassword = '';
      this.repeatPassword = '';
    } else {
      this.loginService.logout();
    }
  }

  changePassword() {
    this.passwordService.changePassword(this.storage.getUserName(), this.oldPassword, this.newPassword)
      .subscribe(
        res => {
          const response = this.parser.parseData(res);
          if (response.result === `${Constants.success}`) {
            alert(`${MessageConstants.passwordUpdated}`);
            return this.router.navigate([`${RouteConstants.userProfile}`]);
          } else if (response.result === `${Constants.incorrect}`) {
            alert(`${MessageConstants.incorrectPassword}`);
            return this.router.navigate([`${RouteConstants.changePassword}`]);
          }
        });
  }
}
