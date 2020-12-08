import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {
  public token: string;
  protected _headers: Headers;
  protected _http: Http;
  headers: any;
  options: any;

  constructor(http: Http) {
    this._http = http;
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this._headers = new Headers({
       'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/xml; charset=UTF-8',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With, access-control-allow-credentials, access-control-allow-headers, access-control-allow-methods, access-control-allow-origin, content-type',
       'Access-Control-Allow-Credentials': 'true'
    });
  }

  getOptions(): any {
    this.headers = new Headers({
      'Authorization': JSON.parse(localStorage.getItem('currentUser')).token,
      'Content-Type': 'application/xml; charset=UTF-8'
    });
    this.options = new RequestOptions({headers: this.headers});
    return this.options;
  }


  getOptionsJson(): any {
    this.headers = new Headers({
      'Authorization': JSON.parse(localStorage.getItem('currentUser')).token,
      'Content-Type': 'application/json; charset=UTF-8'
    });
    this.options = new RequestOptions({headers: this.headers});
    return this.options;
  }
}
