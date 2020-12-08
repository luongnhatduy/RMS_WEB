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
import {DonDatHang} from '../models/dondathang';
import {NhanVien} from '../models/nhanvien';

@Injectable()
export class PhieuNhapService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getPhieuNhap(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_PHIEUNHAP, this.getOptions())
      .map((response: Response) => response.json());
  };

  addPhieuNhap(donDatHang: DonDatHang, nhanVien: NhanVien): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_PHIEUNHAP, JSON.stringify({
      donDatHang: donDatHang,
      nhanVien: nhanVien,
    }), this.getOptionsJson())
      .map((response: Response) => response.json());
  };

  addCTPhieuNhap(phieunhap: any): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_ADD_CTPHIEUNHAP, phieunhap, this.getOptionsJson())
      .map((response: Response) => response.json());
  };

  getCTPhieuNhap(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_CTPHIEUNHAP, this.getOptions())
      .map((response: Response) => response.json());
  };

}
