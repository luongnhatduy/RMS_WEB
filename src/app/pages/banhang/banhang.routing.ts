import { Routes, RouterModule }  from '@angular/router';

import { BanHang } from './banhang.component';
import { DatBan } from './components/datban/datban.component';
import { HoaDon} from  './components/hoadon/hoadon.component';
import {AuthGuard} from '../guards/auth.guard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: BanHang,
    children: [
      { path: 'datban', component: DatBan, canActivate: [AuthGuard] },
      { path: 'hoadon', component: HoaDon, canActivate: [AuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
