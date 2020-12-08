import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppTranslationModule} from '../../app.translation.module';
import {NgaModule} from '../../theme/nga.module';

import {BaoCao} from './baocao.component';
import {HangHoa} from './components/hanghoa/hanghoa.component';
import {DoanhThu} from './components/doanhthu/doanhthu.component';
import {routing}       from './baocao.routing';
import {DropdownModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {YearPicker} from './yearPicker';
import {ChartModule, GrowlModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    DropdownModule,
    CalendarModule,
    ChartModule,
    GrowlModule,
    PanelModule,
    DialogModule,
  ],
  declarations: [
    BaoCao,
    YearPicker,
    HangHoa,
    DoanhThu,
  ],
  providers: []
})
export class BaoCaoModule {
}
