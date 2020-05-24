import {Component, Input} from '@angular/core';
import {ImagesService} from '../../../../services/books/images.service';

@Component({
  selector: 'app-book-edit-image',
  templateUrl: './book-edit-image.component.html',
  styleUrls: ['./book-edit-image.component.css']
})
export class BookEditImageComponent {

  @Input()
  private isbn;
  private selectedImage: File = null;

  constructor(private imagesService: ImagesService) {
  }

  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
  }

  updateImage() {
    this.imagesService.updateBookImage(this.isbn, this.selectedImage);
  }
}
