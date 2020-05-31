import {Injectable} from '@angular/core';
import {Constants} from '../../constants/constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ImagesService {

  constructor(private http: HttpClient) {
  }

  getImage(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.images}` + isbn);
  }

  addBookImage(isbn, image) {
    const formData = new FormData();
    formData.append(`${Constants.image}`, image);
    return this.http.post(`${Constants.hostUrl}${Constants.images}` + isbn, formData);
  }

  updateBookImage(isbn, image) {
    const formData = new FormData();
    formData.append(`${Constants.image}`, image);
    return this.http.put(`${Constants.hostUrl}${Constants.images}` + isbn, formData);
  }
}
