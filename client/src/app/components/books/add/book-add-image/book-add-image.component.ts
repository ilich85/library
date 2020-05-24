import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';
import {ImagesService} from '../../../../services/books/images.service';

@Component({
  selector: 'app-book-add-image',
  templateUrl: './book-add-image.component.html',
  styleUrls: ['./book-add-image.component.css']
})
export class BookAddImageComponent implements OnInit {

  private isbn: number = null;
  private selectedImage: ImageData = null;

  constructor(private activatedRoute: ActivatedRoute, private title: Title,
              private imagesService: ImagesService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isbn = params['isbn'];
    });
    this.title.setTitle('Step 2');
  }

  onFileChanged(event) {
    this.selectedImage = event.target.files[0];
  }

  addImage() {
    this.imagesService.addBookImage(this.isbn, this.selectedImage);
  }
}
