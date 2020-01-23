import {Component, Input} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private usersService: UsersService, private title: Title) {
  }

  @Input() user;

  getUser(username) {
    this.title.setTitle(username);
    return this.usersService.getUser(username);
  }
}
