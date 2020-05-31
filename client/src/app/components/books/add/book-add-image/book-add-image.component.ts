import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ImagesService} from '../../../../services/books/images.service';
import {LoginService} from '../../../../services/users/login.service';
import {Constants} from '../../../../constants/constants';
import {RouteConstants} from '../../../../constants/route-constants';
import {DataParserService} from '../../../../services/data.parser';
import {MessageConstants} from '../../../../constants/message-constants';

@Component({
  selector: 'app-book-add-image',
  templateUrl: './book-add-image.component.html',
  styleUrls: ['./book-add-image.component.css']
})
export class BookAddImageComponent implements OnInit {

  private isbn: number = null;
  private selectedImage: ImageData = null;

  constructor(private activatedRoute: ActivatedRoute, private title: Title,
              private parser: DataParserService, private router: Router,
              private imagesService: ImagesService, private loginService: LoginService) {
  }

  ngOnInit() {
    if (this.loginService.isAdmin()) {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.isbn = params['isbn'];
      });
      this.title.setTitle('Step 2');
    } else {
      this.loginService.logout();
    }
  }

  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
  }

  addImage() {
    this.imagesService.addBookImage(this.isbn, this.selectedImage).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          return this.router.navigate([`${RouteConstants.addFile}` + this.isbn]);
        } else {
          alert(`${MessageConstants.imageNotAdded}`);
        }
      });
  }
}
