import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {routing}       from './pages.routing';
import {NgaModule} from '../theme/nga.module';
import {AppTranslationModule} from '../app.translation.module';
import {
  AuthenticationService,
  BaseService,
  NhanVienService,
  KhachHangService,
  MonAnService,
  HangHoaService,
  NhaCungCapService,
  DatBanService,
  BanService,
  CTMenuService,
  HoaDonService,
  DonDatHangService,
  PhieuNhapService,
} from './services/index';
import {Pages} from './pages.component';
import {AuthGuard} from './guards/index';
import {DonViTinhService} from './services/donvitinh.service';
@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
  providers: [AuthenticationService,
    BaseService, AuthGuard, NhanVienService,
    KhachHangService, MonAnService, HangHoaService, DonViTinhService, NhaCungCapService, DatBanService, BanService, CTMenuService, HoaDonService, DonDatHangService, PhieuNhapService]
})
export class PagesModule {
}
