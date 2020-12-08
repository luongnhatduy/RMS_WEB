import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './banhang.routing';
import { BanHang } from './banhang.component';
import { DatBan } from './components/datban/datban.component';
import {HoaDon} from  './components/hoadon/hoadon.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DataGridModule} from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    NgbDropdownModule,
    NgbModalModule,
    DataGridModule,
    ConfirmDialogModule,
    SharedModule,
    PanelModule,
    DialogModule,
    TabViewModule,
    PickListModule,
    AutoCompleteModule,
    InputTextModule,
    SpinnerModule,
    InputTextareaModule
  ],
  declarations: [
    BanHang,
    DatBan,
    HoaDon,
  ],
  providers: [ConfirmationService]
})
export class BanHangModule {}
