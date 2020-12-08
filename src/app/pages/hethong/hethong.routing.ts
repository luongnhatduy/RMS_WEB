import {Routes, RouterModule}  from '@angular/router';

import {HeThong} from './hethong.component';
import {NhanVien} from './components/nhanvien/nhanvien.component';
import {KhachHang} from './components/khachhang/khachhang.component';
import { Chung } from './components/chung/chung.component';
import { ThucDon } from './components/thucdon/thucdon.component';
import { HangHoa } from './components/hanghoa/hanghoa.component';
import { DatHang } from './components/dathang/dathang.component';
import { NhaCungCap } from './components/nhacungcap/nhacungcap.component';
import { KhuyenMai } from './components/khuyenmai/khuyenmai.component';
import {AuthGuard} from '../guards/auth.guard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: HeThong,
    children: [
      {path: 'nhanvien', component: NhanVien, canActivate: [AuthGuard]},
      {path: 'khachhang', component: KhachHang, canActivate: [AuthGuard] },
      {path: 'chung', component: Chung, canActivate: [AuthGuard]},
      {path: 'thucdon', component: ThucDon, canActivate: [AuthGuard]},
      {path: 'hanghoa', component: HangHoa, canActivate: [AuthGuard]},
      {path: 'dathang', component: DatHang, canActivate: [AuthGuard]},
      {path: 'nhacungcap', component: NhaCungCap, canActivate: [AuthGuard]},
      {path: 'khuyenmai', component: KhuyenMai, canActivate: [AuthGuard]},
      {path: 'monan', component: KhuyenMai, canActivate: [AuthGuard]},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
