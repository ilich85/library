import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users/users.service';
import {Title} from '@angular/platform-browser';
import {StoreService} from '../../../services/users/store.service';
import {LoginService} from '../../../services/users/login.service';
import {DataParserService} from '../../../services/data.parser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private usersService: UsersService, private title: Title,
              private storeService: StoreService, private loginService: LoginService,
              private parser: DataParserService) {
  }

  private books = [];

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.title.setTitle('Profile');
      if (!this.loginService.isAdmin()) {
        this.storeService.getBooksAtUser().subscribe(books => {
          this.books = this.parser.parseData(books);
        });
      }
    } else {
      this.loginService.logout();
    }
  }
}
