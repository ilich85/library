import {Component, Input} from '@angular/core';
import {ImagesService} from '../../../../services/books/images.service';
import {DataParserService} from '../../../../services/data.parser';
import {Constants} from '../../../../constants/constants';
import {MessageConstants} from '../../../../constants/message-constants';

@Component({
  selector: 'app-book-edit-image',
  templateUrl: './book-edit-image.component.html',
  styleUrls: ['./book-edit-image.component.css']
})
export class BookEditImageComponent {

  @Input()
  private isbn;
  private selectedImage: File = null;

  constructor(private imagesService: ImagesService, private  parser: DataParserService) {
  }

  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
  }

  updateImage() {
    this.imagesService.updateBookImage(this.isbn, this.selectedImage).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.imageUpdated}`);
        } else {
          alert(`${MessageConstants.imageNotUpdated}`);
        }
      });
  }
}
