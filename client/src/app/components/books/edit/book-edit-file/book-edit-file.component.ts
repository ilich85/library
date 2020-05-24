import {Component, Input} from '@angular/core';
import {FileService} from '../../../../services/books/files.service';

@Component({
  selector: 'app-book-edit-file',
  templateUrl: './book-edit-file.component.html',
  styleUrls: ['./book-edit-file.component.css']
})
export class BookEditFileComponent {

  @Input()
  private isbn;
  private selectedFile: File = null;

  constructor(private fileService: FileService) {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  updateFile() {
    this.fileService.updateBookFile(this.isbn, this.selectedFile);
  }
}
