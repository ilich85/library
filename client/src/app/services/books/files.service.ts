import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) {
  }

  getFile(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.files}` + isbn);
  }

  addBookFile(isbn, file) {
    const formData = new FormData();
    formData.append(`${Constants.file}`, file);
    return this.http.post(`${Constants.hostUrl}${Constants.files}` + isbn, formData);
  }

  updateBookFile(isbn, file) {
    const formData = new FormData();
    formData.append(`${Constants.file}`, file);
    return this.http.put(`${Constants.hostUrl}${Constants.files}` + isbn, formData);
  }
}
