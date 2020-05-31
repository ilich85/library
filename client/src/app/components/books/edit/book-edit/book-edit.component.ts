import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';
import {LoginService} from '../../../../services/users/login.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  private isbn: number;

  constructor(private  title: Title, private activatedRoute: ActivatedRoute,
              private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.title.setTitle('Edit book');
      this.activatedRoute.params.subscribe((params: Params) => {
        this.isbn = params['isbn'];
      });
    } else {
      this.loginService.logout();
    }
  }
}
