import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FileService} from '../../../services/books/files.service';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit {

  private pdfSrc;
  private isbn: number;

  constructor(private activatedRoute: ActivatedRoute, private fileService: FileService) {
  }

  ngOnInit(): any {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isbn = params['isbn'];
    });
    this.fileService.getFile(this.isbn).subscribe(res => {
      this.pdfSrc = res.text();
    });
  }
}
