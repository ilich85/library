import {Injectable} from '@angular/core';


const TOKEN = 'token';

@Injectable()
export class TokenStorage {

  public userRoles: string[];
  public userName: string;

  constructor() {
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN);
  }

  public getUserRoles(): string[] {
    const decodedJwtData = this.parseToken(window.sessionStorage.getItem(TOKEN));
    this.userRoles = decodedJwtData['roles'] ? decodedJwtData['roles'].split(',') : [];
    return this.userRoles;
  }

  public getUserName(): string {
    const decodedJwtData = this.parseToken(window.sessionStorage.getItem(TOKEN));
    this.userName = decodedJwtData['sub'] ? decodedJwtData['sub'] : '';
    return this.userName;
  }


  private parseToken(token: string) {
    if (!token) {
      return '';
    }
    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    return JSON.parse(decodedJwtJsonData);
  }
}
