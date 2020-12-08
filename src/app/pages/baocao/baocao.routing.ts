import {Routes, RouterModule}  from '@angular/router';

import {BaoCao} from './baocao.component';
import {ModuleWithProviders} from '@angular/core';
import {DoanhThu} from './components/doanhthu/doanhthu.component';
import {HangHoa} from './components/hanghoa/hanghoa.component';
import {AuthGuard} from '../guards/auth.guard';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: BaoCao,
    children: [
      {path: 'doanhthu', component: DoanhThu, canActivate: [AuthGuard]},
      {path: 'hanghoa', component: HangHoa, canActivate: [AuthGuard]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
