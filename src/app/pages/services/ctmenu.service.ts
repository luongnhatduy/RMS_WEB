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
import {ObjResponse, HangHoa} from '../models/index';
import {Menu} from '../models/menu';
import {MonAn} from '../models/monan';
import {CTMenu} from '../models/ctmenu';

@Injectable()
export class CTMenuService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getctmenu(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_CTMENU, this.getOptions())
      .map((response: Response) => response.json());
  };


  addNewCTMenu(ctmenu: any): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_CTMENU, ctmenu, this.getOptionsJson())
      .map((response: Response) => response.json());
  };

  addNewMenu(menu: any): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_MENU, JSON.stringify(menu), this.getOptionsJson())
      .map((response: Response) => response.json());
  };
}
