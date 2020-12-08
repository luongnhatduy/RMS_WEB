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
import {DatBan} from '../banhang/components/datban/datban.component';
import {KhachHang} from '../models/khachhang';
import {NhanVien} from '../models/nhanvien';
import {DatBanModel} from '../models/datban';

@Injectable()
export class HoaDonService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getHoaDon(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_HOADON, this.getOptions())
      .map((response: Response) => response.json());
  };

  addNewHoaDon(datBan: DatBanModel, khachHang: KhachHang, nhanVien: NhanVien, status: number): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_HOADON, JSON.stringify({
      datBan: datBan,
      khachHang: khachHang,
      nhanVien: nhanVien,
      trangThai: status
    }), this.getOptionsJson())
      .map((response: Response) => response.json());
  };

  updateNewHoaDon(datBan: DatBanModel, khachHang: KhachHang, nhanVien: NhanVien, status: number, idhoaDon: number): Observable<ObjResponse> {
    return this._http.put(AppSettings.API_UPDATE_HOADON, JSON.stringify({
      idhoaDon: idhoaDon,
      datBan: datBan,
      khachHang: khachHang,
      nhanVien: nhanVien,
      trangThai: status
    }), this.getOptionsJson())
      .map((response: Response) => response.json());
  };

}
