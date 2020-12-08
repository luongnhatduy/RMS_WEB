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
import {ObjResponse, NhaCungCap} from '../models/index';

@Injectable()
export class NhaCungCapService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getNhaCungCap(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_NHACUNGCAP, this.getOptions())
      .map((response: Response) => response.json());
  };

  deleteNhaCupCap(nhaCungCap: NhaCungCap): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_NHACUNGCAP, JSON.stringify({
      id: nhaCungCap.idnhaCungCap,
      type: 'delete',
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  newNhaCungCap(nhaCungCap: NhaCungCap): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_NHACUNGCAP, JSON.stringify({
        id: nhaCungCap.idnhaCungCap,
        tenNCC: nhaCungCap.tenNcc,
        type: 'new',
        diaChi: nhaCungCap.diaChi,
        sdt: nhaCungCap.sdt,
        email: nhaCungCap.email,
        ngayBatDau: nhaCungCap.ngayBd,
        ngayKetThuc: nhaCungCap.ngayKt,
      }),
      this.getOptions()
    ).map((response: Response) => response.json());
  }

  editNhaCungCap(nhaCungCap: NhaCungCap): Observable<ObjResponse> {
    let d = new Date();
    return this._http.post(AppSettings.API_UPDATE_NHACUNGCAP, JSON.stringify({
      id: nhaCungCap.idnhaCungCap,
      tenNCC: nhaCungCap.tenNcc,
      type: 'edit',
      diaChi: nhaCungCap.diaChi,
      sdt: nhaCungCap.sdt,
      email: nhaCungCap.email,
      ngayBatDau: nhaCungCap.ngayBd ? nhaCungCap.ngayBd : 'no',
      ngayKetThuc: nhaCungCap.ngayKt,
    }), this.getOptions()).map((response: Response) => response.json());
  }
}
