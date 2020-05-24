import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Constants} from '../../constants/constants';
import {MessageConstants} from '../../constants/message-constants';
import {RouteConstants} from '../../constants/route-constants';

@Injectable()
export class ImagesService {

  constructor(private http: Http, private router: Router) {
  }

  getImage(isbn) {
    return this.http.get(`${Constants.hostUrl}${Constants.images}` + isbn);
  }

  addBookImage(isbn, image) {
    const formData = new FormData();
    formData.append(`${Constants.image}`, image);
    this.http.post(`${Constants.hostUrl}${Constants.images}` + isbn, formData).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          return this.router.navigate([`${RouteConstants.addFile}` + isbn]);
        } else {
          alert(`${MessageConstants.imageNotAdded}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }

  updateBookImage(isbn, image) {
    const formData = new FormData();
    formData.append(`${Constants.image}`, image);
    this.http.put(`${Constants.hostUrl}${Constants.images}` + isbn, formData).subscribe(
      res => {
        if (res.text() === `${Constants.success}`) {
          alert(`${MessageConstants.imageUpdated}`);
        } else {
          alert(`${MessageConstants.imageNotUpdated}`);
        }
      },
      err => {
        alert(`${MessageConstants.serverError}`);
        return err;
      });
  }
}
