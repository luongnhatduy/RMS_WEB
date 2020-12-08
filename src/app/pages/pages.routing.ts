import {Routes, RouterModule}  from '@angular/router';
import {Pages} from './pages.component';
import {ModuleWithProviders} from '@angular/core';
import { AuthGuard } from './guards/index';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },

  {
    path: 'pages',
    component: Pages,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
      {path: 'banhang', loadChildren: './banhang/banhang.module#BanHangModule', canActivate: [AuthGuard]},
      {path: 'baocao', loadChildren: './baocao/baocao.module#BaoCaoModule', canActivate: [AuthGuard]},
      {path: 'hethong', loadChildren: './hethong/hethong.module#HeThongModule', canActivate: [AuthGuard]},
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
