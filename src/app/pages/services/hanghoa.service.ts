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

@Injectable()
export class HangHoaService extends BaseService {
  constructor(http: Http, public router: Router) {
    super(http);
  }

  getHangHoa(): Observable<ObjResponse> {
    return this._http.get(AppSettings.API_GET_HANGHOA, this.getOptions())
      .map((response: Response) => response.json());
  };

  deleteHangHoa(hangHoa: HangHoa): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_HANGHOA, JSON.stringify({
      id: hangHoa.idhangHoa,
      type: 'delete',
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  newHangHoa(hangHoa: HangHoa): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_HANGHOA, JSON.stringify({
        id: hangHoa.idhangHoa,
        tenHangHoa: hangHoa.tenHang,
        type: 'new',
        slHienCo: hangHoa.slhienCo,
        donViTinh: hangHoa.donViTinh,
        ghiChu: hangHoa.donGia,
        donGia: hangHoa.donGia
      }),
      this.getOptions()
    ).map((response: Response) => response.json());
  }

  editHangHoa(hangHoa: HangHoa): Observable<ObjResponse> {
    return this._http.post(AppSettings.API_UPDATE_HANGHOA, JSON.stringify({
      id: hangHoa.idhangHoa,
      tenHangHoa: hangHoa.tenHang,
      type: 'edit',
      slHienCo: hangHoa.slhienCo,
      donViTinh: hangHoa.donViTinh,
      ghiChu: hangHoa.ghiChu,
      donGia: hangHoa.donGia
    }), this.getOptions())
      .map((response: Response) => response.json());
  }

  updateSoLuongHangHoa(dsSLMonAn): Observable<ObjResponse> {
    return this._http.put(AppSettings.API_UPDATE_SLHANGHOA, dsSLMonAn, this.getOptionsJson())
      .map((response: Response) => response.json());
  };

}
