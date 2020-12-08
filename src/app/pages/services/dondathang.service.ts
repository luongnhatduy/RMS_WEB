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
import {NhaCungCap} from '../models/nhacungcap';
import {NhanVien} from '../models/nhanvien';
import {DonDatHang} from '../models/dondathang';

@Injectable()
export class DonDatHangService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getDonDatHang(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_DONDATHANG, this.getOptions())
      .map((response: Response) => response.json());
  };

  getCTDonDatHangByDDHID(id): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_CTDONDATHANG + '?id=' + id, this.getOptions())
      .map((response: Response) => response.json());
  };

  addNewDonDatHang(nhaCungCap: NhaCungCap, nhanVien: NhanVien, status: number): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_DONDATHANG, JSON.stringify({
      nhaCungCap: nhaCungCap,
      nhanVien: nhanVien,
      trangThai: status,
    }), this.getOptionsJson())
      .map((response: Response) => response.json());
  };

  addNewCTDonDatHang(ctddh: any): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_CTDONDATHANG, ctddh, this.getOptionsJson())
      .map((response: Response) => response.json());
  };

  updateDonDatHang(data: DonDatHang): Observable<ObjResponse> {
    return this._http.put(AppSettings.API_UPDATE_DONDATHANG, JSON.stringify({
      iddonDatHang: data.iddonDatHang,
    }), this.getOptionsJson())
      .map((response: Response) => response.json());
  };

}
