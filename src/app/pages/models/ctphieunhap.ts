import {Menu} from './menu';
import {MonAn} from './monan';
import {HangHoa} from './hanghoa';
import {PhieuNhap} from './phieunhap';
/**
 * Created by nguye on 06/08/2017.
 */
export class CTPhieuNhap {
  id: {
    idphieuNhap: number;
    idhangHoa: number;
  };
  hangHoa: HangHoa;
  phieuNhap: PhieuNhap;
  slNhap: number;

}
