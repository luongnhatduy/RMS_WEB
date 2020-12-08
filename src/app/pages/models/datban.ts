import {Ban} from './ban';
import {KhachHang} from './khachhang';
import {Menu} from './menu';
import {NhanVien} from './nhanvien';
/**
 * Created by nguye on 30/07/2017.
 */
export class DatBanModel {
  iddatBan: number;
  ban: Ban;
  khachHang: KhachHang;
  menu: Menu;
  nhanVien: NhanVien;
  slnguoi: number;
  ngayGioDat: string;
  trangThai: number;
  ghiChu: string;

}
