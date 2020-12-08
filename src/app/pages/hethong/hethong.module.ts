import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';

import {routing} from './hethong.routing';
import {HeThong} from './hethong.component';
import {NhanVien} from './components/nhanvien/nhanvien.component';
import {KhachHang} from './components/khachhang/khachhang.component';
import {Chung} from './components/chung/chung.component';
import {ThucDon} from './components/thucdon/thucdon.component';
import {HangHoa} from './components/hanghoa/hanghoa.component';
import {DatHang} from './components/dathang/dathang.component';
import {NhaCungCap} from './components/nhacungcap/nhacungcap.component';
import {KhuyenMai} from './components/khuyenmai/khuyenmai.component';
import {MonAn} from './components/monan/monan.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {DialogModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {ChipsModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    DialogModule,
    TabViewModule,
    DataGridModule,
    ConfirmDialogModule,
    SharedModule,
    PanelModule,
    ButtonModule,
    ChipsModule,
    DataTableModule,
    AutoCompleteModule,
    InputTextModule,
  ],
  declarations: [
    HeThong,
    KhachHang,
    NhanVien,
    Chung,
    HangHoa,
    ThucDon,
    DatHang,
    NhaCungCap,
    KhuyenMai,
    MonAn,
  ],
  providers: [ConfirmationService]
})
export class HeThongModule {
}
