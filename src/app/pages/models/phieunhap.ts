import {NhaCungCap} from './nhacungcap';
import {NhanVien} from './nhanvien';
import {CTDonDatHang} from './ctdondathang';
import {DonDatHang} from './dondathang';
import {CTPhieuNhap} from './ctphieunhap';
/**
 * Created by nguye on 06/08/2017.
 */
export class PhieuNhap {
  idphieuNhap: number;
  donDatHang: DonDatHang;
  nhanVien: NhanVien;
  nhayNhap: string;
  CTPhieuNhap: CTPhieuNhap[];

}
