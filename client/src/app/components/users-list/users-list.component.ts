import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users = [];

  constructor(private usersService: UsersService, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle("Users");
    this.usersService.getUsers().subscribe(users => {
      this.users = users.json();
    });
  }
}
