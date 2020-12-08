import {KhachHang} from './khachhang';
import {NhanVien} from './nhanvien';
import {DatBanModel} from './datban';
import {MonAn} from './monan';
import {CTMenu} from './ctmenu';
/**
 * Created by nguye on 06/08/2017.
 */
export class HoaDonModel {
  idhoaDon: number;
  datBan: DatBanModel;
  khachHang: KhachHang;
  nhanVien: NhanVien;
  ngayLapHd: string;
  trangThai: number;
  tongCong: number;
  monAn: MonAn[];
  ctMenu: CTMenu[];
}
