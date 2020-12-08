import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import { BaseService } from './base.service';
import { AppSettings } from '../shared/app.setting';
import { Token } from '../models/token';

@Injectable()
export class AuthenticationService extends BaseService {
  options: RequestOptions;

  constructor(http: Http, public router: Router) {
    super(http);
  }

  getOptions() {
    let headers = new Headers({
      'Authorization': JSON.parse(localStorage.getItem('currentUser')).token,
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({headers: headers});
    return this.options;
  }

  /**
   * @param email
   * @param password
   * @returns {Observable<R>}
   */
  public login(username: string, password: string): Observable<Token> {
    var options = new RequestOptions({
      headers: this._headers
  })
    ;
    return this._http.post(AppSettings.API_LOGIN, JSON.stringify({
      username: username,
      password: password,
    }), options)
      .map((response: Response) => response.json());
  }

  logout(): void {
   localStorage.clear();
   this.router.navigate([AppSettings.LOGIN_ROUTE]);
   }


  /* isLoggedIn(cb: any): any {
   if (localStorage.getItem('currentUser')) {
   this.verifyToken().subscribe(
   response => {
   return cb(null, response.status);
   },
   error => {
   return cb(null, false);
   }
   );
   } else {
   return cb(null, false);
   }
   }*/
}
