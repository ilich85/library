import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FileService} from '../../../services/books/files.service';
import {LoginService} from '../../../services/users/login.service';
import {DataParserService} from '../../../services/data.parser';
import {StoreService} from '../../../services/users/store.service';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit {

  private pdfSrc;
  private isbn: number;
  private booksAtUser = [];

  constructor(private activatedRoute: ActivatedRoute, private fileService: FileService,
              private loginService: LoginService, private parser: DataParserService,
              private storeService: StoreService) {
  }

  ngOnInit(): any {
    if (this.loginService.isLoggedIn() ) {
      this.storeService.getBooksAtUser().subscribe(books => {
        this.booksAtUser = this.parser.parseData(books);
      });
      if (this.booksAtUser.find((book) => book.isbn == this.isbn)) {
        this.activatedRoute.params.subscribe((params: Params) => {
          this.isbn = params['isbn'];
        });
        this.fileService.getFile(this.isbn).subscribe(res => {
          const response = this.parser.parseData(res);
          if (Object.keys(response.result).length > 40) {
            this.pdfSrc = response.result;
          }
        });
      }
    } else {
      this.loginService.logout();
    }
  }
}
