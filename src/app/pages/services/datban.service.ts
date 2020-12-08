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
import {DatBanModel} from '../models/datban';

@Injectable()
export class DatBanService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getDatBan(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_DATBAN, this.getOptions())
      .map((response: Response) => response.json());
  };

  updateDatBanService(datBan: DatBanModel): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_DATBAN, JSON.stringify({
      id: datBan.iddatBan,
      trangthai: datBan.trangThai,
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  addDatBanService(datBan: any): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_DATBAN, datBan, this.getOptionsJson())
      .map((response: Response) => response.json());
  }


}
