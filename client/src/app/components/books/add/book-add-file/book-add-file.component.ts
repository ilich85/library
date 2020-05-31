import {Component, OnInit} from '@angular/core';
import {FileService} from '../../../../services/books/files.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LoginService} from '../../../../services/users/login.service';
import {Constants} from '../../../../constants/constants';
import {MessageConstants} from '../../../../constants/message-constants';
import {RouteConstants} from '../../../../constants/route-constants';
import {DataParserService} from '../../../../services/data.parser';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add-file.component.html',
  styleUrls: ['./book-add-file.component.css']
})
export class BookAddFileComponent implements OnInit {

  private isbn: number = null;
  private selectedFile: File = null;

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService,
              private fileService: FileService, private title: Title,
              private router: Router, private parser: DataParserService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.isbn = params['isbn'];
      });
      this.title.setTitle('Step 3');
    } else {
      this.loginService.logout();
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  addFile() {
    this.fileService.addBookFile(this.isbn, this.selectedFile).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.bookAdded}`);
          return this.router.navigate([`${RouteConstants.admin}`]);
        } else {
          alert(`${MessageConstants.fileNotAdded}`);
        }
      });
  }
}
