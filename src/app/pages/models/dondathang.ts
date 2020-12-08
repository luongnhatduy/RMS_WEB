import {NhaCungCap} from './nhacungcap';
import {NhanVien} from './nhanvien';
import {CTDonDatHang} from './ctdondathang';
/**
 * Created by nguye on 06/08/2017.
 */
export class DonDatHang {
  iddonDatHang: number;
  nhaCungCap: NhaCungCap;
  nhanVien: NhanVien;
  ngayDatHang: string;
  trangThai: number;
  CTDonDatHang: CTDonDatHang[];

}
