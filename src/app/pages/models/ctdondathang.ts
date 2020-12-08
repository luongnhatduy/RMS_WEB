import {Menu} from './menu';
import {MonAn} from './monan';
import {HangHoa} from './hanghoa';
import {DonDatHang} from './dondathang';
/**
 * Created by nguye on 06/08/2017.
 */
export class CTDonDatHang{
  id: {
    iddonDatHang: number,
    idhangHoa: number
  };
  hangHoa: HangHoa;
  sldat: number;
  donDatHang: DonDatHang;

}
