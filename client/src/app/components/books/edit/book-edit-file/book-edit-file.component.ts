import {Component, Input} from '@angular/core';
import {FileService} from '../../../../services/books/files.service';
import {Constants} from '../../../../constants/constants';
import {MessageConstants} from '../../../../constants/message-constants';
import {DataParserService} from '../../../../services/data.parser';

@Component({
  selector: 'app-book-edit-file',
  templateUrl: './book-edit-file.component.html',
  styleUrls: ['./book-edit-file.component.css']
})
export class BookEditFileComponent {

  @Input()
  private isbn;
  private selectedFile: File = null;

  constructor(private fileService: FileService, private  parser: DataParserService) {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  updateFile() {
    this.fileService.updateBookFile(this.isbn, this.selectedFile).subscribe(
      res => {
        const response = this.parser.parseData(res);
        if (response.result === `${Constants.success}`) {
          alert(`${MessageConstants.fileUpdated}`);
        } else {
          alert(`${MessageConstants.fileNotUpdated}`);
        }
      });
  }
}
