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
import {KhachHang} from '../models/khachhang';

@Injectable()
export class KhachHangService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }
  getKhachHang(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_KHACHHANG, this.getOptions())
      .map((response: Response) => response.json());
  };

  deleteKhachHang(khachHang: KhachHang): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_KHACHHANG, JSON.stringify({
      id: khachHang.idkhachHang,
      type: 'delete',
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  editKhachHang(khachHang: KhachHang): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_KHACHHANG, JSON.stringify({
      id: khachHang.idkhachHang,
      tenkhachhang: khachHang.tenkhachhang,
      type: 'edit',
      diachi: khachHang.diachi,
      sdt: khachHang.sdt,
      email: khachHang.email,
      diemthuong: khachHang.diemthuong,
      ghichu: khachHang.ghichu,
      the: khachHang.the,
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  newKhachHang(khachHang: KhachHang): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_KHACHHANG, JSON.stringify({
      tenkhachhang: khachHang.tenkhachhang,
      type: 'new',
      diachi: khachHang.diachi,
      sdt: khachHang.sdt,
      email: khachHang.email,
      diemthuong: '0',
      ghichu: khachHang.ghichu,
      the: khachHang.the,
    }), this.getOptions())
      .map((response: Response) => response.json());
  }
}
