import {DonViTinh} from './donvitinh';
import {DanhMuc} from './danhmuc';
/**
 * Created by nguye on 30/07/2017.
 */
export class MonAn {
  idmonAn: number;
  tenMon: string;
  donViTinh: DonViTinh;
  anh: string;
  danhMuc: DanhMuc;
  ghichu: string;
  dinhLuong: [{
      id: {
        idmonAn: string;
        idhangHoa: string;
      };
      hangHoa: {
      idhangHoa: string;
      donViTinh: {
        tenDonVi: string;
      };
      tenHang: string;
      donGia: string;
      slhienCo: string;
      ghiChu: string;
    };
    sl: string;
  }];
  bangGia: [{
    gia: string;
    ngayApDung: string;
  }]
}
