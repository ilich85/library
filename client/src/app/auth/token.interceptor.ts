import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {RouteConstants} from '../constants/route-constants';
import 'rxjs/add/operator/do';
import {TokenStorage} from './token.storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public storage: TokenStorage, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.storage.getToken() != null) {
      authReq = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${this.storage.getToken()}`)
      });
    }
    return next.handle(authReq).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status || err.status === 401) {
            return this.router.navigate([`${RouteConstants.login}`]);
          }
        }
      }
    );
  }
}
