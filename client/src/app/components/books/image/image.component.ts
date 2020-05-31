import {Component, Input, OnInit} from '@angular/core';
import {ImagesService} from '../../../services/books/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input()
  private isbn;
  private image;
  private imageObject;

  constructor(private imageService: ImagesService) {
  }

  ngOnInit() {
    this.imageService.getImage(this.isbn).subscribe(res => {
      this.imageObject = JSON.parse(JSON.stringify(res));
      this.image = this.imageObject.result;
    });
  }
}
