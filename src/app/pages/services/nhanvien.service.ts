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
import {NhanVien} from '../models/nhanvien';

@Injectable()
export class NhanVienService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getNhanVien(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_NHANVIEN, this.getOptions())
      .map((response: Response) => response.json());
  };

  deleteNhanVien(nhanVien: NhanVien): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_NHANVIEN, JSON.stringify({
      taikhoan: nhanVien.taikhoan,
      type: 'delete',
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  editNhanVien(nhanVien: NhanVien): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_NHANVIEN, JSON.stringify({
      id: nhanVien.id,
      taikhoan: nhanVien.taikhoan,
      type: 'edit',
      matkhau: nhanVien.matkhau,
      ho: nhanVien.ho,
      ten: nhanVien.ten,
      diachi: nhanVien.diachi,
      sdt: nhanVien.sdt,
      quyen: nhanVien.quyen,
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  newNhanVien(nhanVien: NhanVien): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_NHANVIEN, JSON.stringify({
      taikhoan: nhanVien.taikhoan,
      type: 'new',
      matkhau: nhanVien.matkhau,
      ho: nhanVien.ho,
      ten: nhanVien.ten,
      diachi: nhanVien.diachi,
      sdt: nhanVien.sdt,
      quyen: nhanVien.quyen,
    }), this.getOptions())
      .map((response: Response) => response.json());
  }
}
