/**
 * Created by nguye on 25/07/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {AppSettings} from '../shared/app.setting';
import {Router} from '@angular/router';
import {BaseService} from './base.service';
import {ObjResponse} from '../models/index';

@Injectable()
export class MonAnService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getMonAn(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_MONAN, this.getOptions())
      .map((response: Response) => response.json());
  };
}
