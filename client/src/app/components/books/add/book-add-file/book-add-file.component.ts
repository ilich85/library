import {Component, OnInit} from '@angular/core';
import {FileService} from '../../../../services/books/files.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add-file.component.html',
  styleUrls: ['./book-add-file.component.css']
})
export class BookAddFileComponent implements OnInit {

  private isbn: number = null;
  private selectedFile: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              private fileService: FileService, private title: Title) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isbn = params['isbn'];
    });
    this.title.setTitle('Step 3');
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  addFile() {
    this.fileService.addBookFile(this.isbn, this.selectedFile);
  }
}
