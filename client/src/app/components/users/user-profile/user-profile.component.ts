import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../services/users/users.service';
import {Title} from '@angular/platform-browser';
import {StoreService} from '../../../services/users/store.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private usersService: UsersService, private title: Title, private storeService: StoreService) {
  }

  private books = [];

  ngOnInit() {
    this.title.setTitle('Profile');
    this.storeService.getBooksAtUser().subscribe(books => {
      this.books = books.json();
    });
  }
}
