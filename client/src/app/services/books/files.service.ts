import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {MessageConstants} from '../../constants/message-constants';
import {RouteConstants} from '../../constants/route-constants';

@Injectable()
export class FileService {

  constructor(private http: Http, private router: Router) {
  }

  getFile(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.files}` + isbn);
  }

  addBookFile(isbn, file) {
    const formData = new FormData();
    formData.append(`${Constants.file}`, file);
    this.http.post(`${Constants.hostUrl}${Constants.files}` + isbn, formData).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.bookAdded}`);
          return this.router.navigate([`${RouteConstants.admin}`]);
        } else {
          alert(`${MessageConstants.fileNotAdded}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  updateBookFile(isbn, file) {
    const formData = new FormData();
    formData.append(`${Constants.file}`, file);
    this.http.put(`${Constants.hostUrl}${Constants.files}` + isbn, formData).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.fileUpdated}`);
        } else {
          alert(`${MessageConstants.fileNotUpdated}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }
}
