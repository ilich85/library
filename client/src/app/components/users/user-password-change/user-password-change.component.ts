import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PasswordService} from '../../../services/users/password.service';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent implements OnInit {

  private oldPassword;
  private newPassword;
  private repeatPassword;

  constructor(private title: Title, private passwordService: PasswordService) {
  }

  ngOnInit() {
    this.title.setTitle('Change Password');
    this.oldPassword = '';
    this.newPassword = '';
    this.repeatPassword = '';
  }

  changePassword() {
    this.passwordService.changePassword('admin123', this.oldPassword, this.newPassword);
  }
}
