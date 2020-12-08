import {Component, ViewContainerRef} from '@angular/core';
import {Message, SelectItem} from 'primeng/primeng';
import {HoaDonModel} from '../../../models/hoadon';
import {MonAn} from '../../../models/monan';
import {ToastsManager} from 'ng2-toastr';
import {HoaDonService} from '../../../services/hoadon.service';
import {MonAnService} from '../../../services/monan.service';
import {CTMenu} from '../../../models/ctmenu';
import {CTMenuService} from '../../../services/ctmenu.service';
import {DatePipe} from '@angular/common';
import {PhieuNhapService} from '../../../services/phieunhap.service';
import {CTPhieuNhap} from '../../../models/ctphieunhap';

@Component({
  selector: 'hanghoa',
  templateUrl: './hanghoa.html'
})
export class HangHoa {
  listBaoCao: SelectItem[];
  date: Date;
  dateHangHoa: Date;
  selectedLoaiBaoCao: any;
  selectedLoaiBaoCaoHangHoa: any;
  danhSachHoaDon: HoaDonModel[];
  danhSachCTmenu: CTMenu[];
  danhSachMonAn: MonAn[];
  danhSachHoaDonFilter: HoaDonModel[];
  tongCong: number = 0;
  tongSLHoaDon: number = 0;
  tongSLHangHoa: number = 0;
  tongCongLuocDatHang: number = 0;
  years: SelectItem[] = [];
  yy: number;
  year: string;
  yearByMonth: string;
  month: string;
  months: SelectItem[] = [];
  danhSachHoaDonByMonth: any[];
  data: any;
  msgs: Message[];
  displayDialog: boolean;
  detailHoaDonByDay: HoaDonModel[];
  danhSachTongTienFilterYear: any = [];
  danhSachTenHangHoa: string[];
  danhSachSoLuongHangHoa: string[];
  danhSachCTPhieuNhap: CTPhieuNhap[];
  dataHangHoa: any;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private ctMenu: CTMenuService, private hoaDonService: HoaDonService, private monAnService: MonAnService, private phieuNhapService: PhieuNhapService) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.listBaoCao = [];
    this.danhSachCTPhieuNhap = [];
   // this.date = new Date();
    this.listBaoCao.push({label: 'Theo Ngày', value: {id: 1}});
    this.listBaoCao.push({label: 'Theo Tháng', value: {id: 2}});
    this.listBaoCao.push({label: 'Theo Năm', value: {id: 3}});
    this.setDataChartHangHoa(this.data)
  }

  selectData(event) {
    this.msgs = [];
    this.msgs.push({
      severity: 'info',
      summary: 'Data Selected',
      'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]
    });
  }

  ngOnInit() {
    var that = this;
    this.hoaDonService.getHoaDon().subscribe(
      response => {
        if (response.status) {
          that.danhSachHoaDon = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.monAnService.getMonAn().subscribe(
      response => {
        if (response.status) {
          that.danhSachMonAn = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.ctMenu.getctmenu().subscribe(
      response => {
        if (response.status) {
          that.danhSachCTmenu = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.phieuNhapService.getCTPhieuNhap().subscribe(
      response => {
        if (response.status) {
          that.danhSachCTPhieuNhap = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.getYear();
    this.getMonth();
    this.selectedLoaiBaoCao = {id: 1};
  }

  changeDropdown(event) {
    console.log( this.selectedLoaiBaoCao )
    var that = this;
    var today = new Date();
    let thongTinHoaDonByDay = {};
    that.danhSachHoaDonFilter = [];
    that.danhSachHoaDonByMonth = [];
    that.tongCong = 0;
    that.tongSLHoaDon = 0;
    var datePipe = new DatePipe("en-US");
    var setDob = datePipe.transform(this.date, 'yyyy-MM-dd');

    that.danhSachHoaDon.forEach((item) => {
      item.monAn = [];
      item.tongCong = 0;
      that.danhSachCTmenu.forEach((dataCTMenu) => {
        if (item.datBan.menu.idmenu === dataCTMenu.id.idmenu) {
          that.danhSachMonAn.forEach((monan) => {
            if (monan.idmonAn === dataCTMenu.id.idmonAn) {
              item.monAn.push(monan);
              item.tongCong = +item.tongCong + +monan.bangGia[0].gia * +dataCTMenu.soluong;
            }
          });
        }
      });
    });

    if (event.value.id === 1) {
      this.danhSachHoaDon.forEach((item) => {
        if (item.ngayLapHd === setDob) {
          that.danhSachHoaDonFilter.push(item);
          this.tongCong = +this.tongCong + +item.tongCong;
          that.tongSLHoaDon = +that.tongSLHoaDon + 1;
        }
      });
    }
    if (event.value.id === 2) {
      that.yearByMonth = today.getFullYear() + '';
      that.month = '0' + (today.getMonth() + +1);
      for (let i = 1; i < 32; i++) {
        let danhSachHoaDonFilterMonth: any = [];
        let thongTinHoaDonByDay: any = {};
        let tongTien = 0;
        let tongHD = 0;
        let dayCheck;
        if (i < 10)
          dayCheck = '0' + i;
        else
          dayCheck = i;
        that.danhSachHoaDon.forEach((item) => {
          let day = that.getDayInDate(item.ngayLapHd);
          let month = that.getMonthInDate(item.ngayLapHd);
          let year = that.getYearInDate(item.ngayLapHd);
          if (day == dayCheck && month == that.month && year == that.yearByMonth) {
            danhSachHoaDonFilterMonth.push(item);
            tongTien = +tongTien + +item.tongCong;
            tongHD = +tongHD + 1;
          }
        });
        thongTinHoaDonByDay.tongTien = tongTien;
        thongTinHoaDonByDay.tongHD = tongHD;
        thongTinHoaDonByDay.item = danhSachHoaDonFilterMonth;
        thongTinHoaDonByDay.ngay = dayCheck + '-' + that.month + '-' + that.yearByMonth
        that.danhSachHoaDonByMonth.push(thongTinHoaDonByDay);
      }
      that.danhSachHoaDonByMonth.forEach((item) => {
        that.tongCong = +that.tongCong + +item.tongTien;
        that.tongSLHoaDon = +that.tongSLHoaDon + +item.tongHD;
      })
    }


    if (event.value.id === 3) {
      this.year = today.getFullYear() + '';
      that.danhSachTongTienFilterYear = [];
      let thongTinHoaDonByDay: any = {};
      let monthCheck;
      for (let i = 1; i < 13; i++) {
        let tongTien = 0;
        if (i < 10)
          monthCheck = '0' + i;
        else
          monthCheck = i;
        that.danhSachHoaDon.forEach((item) => {
          let month = that.getMonthInDate(item.ngayLapHd);
          let year = that.getYearInDate(item.ngayLapHd);
          if (month == monthCheck && year == that.year) {
            tongTien = +tongTien + item.tongCong;
            that.tongCong = +that.tongCong + +item.tongCong;
            that.tongSLHoaDon = +that.tongSLHoaDon + 1;
          }
        });
        that.danhSachTongTienFilterYear.push(tongTien);
      }
      this.setDataChart(this.danhSachTongTienFilterYear);
    }

  }

  getDayInDate(date): any {
    return date.split('-')[2];
  }

  getMonthInDate(date): any {
    return date.split('-')[1];
  }

  getYearInDate(date): any {
    return date.split('-')[0];
  }

  selectdate() {
    var that = this;
    that.danhSachHoaDon.forEach((item) => {
      item.monAn = [];
      item.tongCong = 0;
      that.danhSachCTmenu.forEach((dataCTMenu) => {
        if (item.datBan.menu.idmenu === dataCTMenu.id.idmenu) {
          that.danhSachMonAn.forEach((monan) => {
            if (monan.idmonAn === dataCTMenu.id.idmonAn) {
              item.monAn.push(monan);
              item.tongCong = +item.tongCong + +monan.bangGia[0].gia * +dataCTMenu.soluong;
            }
          });
        }
      });
    });
    that.tongCong = 0;
    that.tongSLHoaDon = 0;
    that.danhSachHoaDonFilter = [];
    var datePipe = new DatePipe("en-US");
    var setDob = datePipe.transform(this.date, 'yyyy-MM-dd');
    this.danhSachHoaDon.forEach((item) => {
      if (item.ngayLapHd === setDob) {
        that.danhSachHoaDonFilter.push(item);
        that.tongCong = +that.tongCong + +item.tongCong;
        that.tongSLHoaDon = +that.tongSLHoaDon + 1;
      }
    });
    console.log(this.tongCong);
  }

  viewHoaDon(data) {
    var that = this;
    that.displayDialog = true;
    that.detailHoaDonByDay = data.item;
  }

  onDialogHide() {
    this.displayDialog = false;
  }

  getYear() {
    var today = new Date();
    this.yy = today.getFullYear();
    for (var i = (this.yy - 100); i <= this.yy; i++) {
      this.years.push({label: i + '', value: i});
    }
  }

  getMonth() {
    for (let i = 1; i < 13; i++) {
      this.months.push({label: i + '', value: '0' + i})
    }
  }

  setDataChart(data) {
    this.data = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: 'Doanh Thu',
          data: data,
          fill: false,
          borderColor: '#eaed63'
        }
      ]
    }
  }
  setDataChartHangHoa(data) {
    this.dataHangHoa = {
      labels: ['Gạo', 'Dầu Oliu', 'Cải xanh', 'Thịt Heo', 'Măng kho', 'Cải chua', 'Đậu nành'],
      datasets: [
        {
          label: 'Nhập',
          data: [5, 9, 4, 7, 10, 8, 6],
          fill: false,
          borderColor: '#eaed63'
        },
        {
          label: 'Xuất',
          data: [4, 8, 2, 4, 8, 7, 6],
          fill: false,
          borderColor: '#c92a6f'
        }
      ]
    }
  }

  seletedYearByMonth() {
    var that = this;
    that.tongCong = 0;
    that.tongSLHoaDon = 0;
    that.danhSachHoaDonByMonth = [];
    for (let i = 1; i < 32; i++) {
      let danhSachHoaDonFilterMonth: any = [];
      let thongTinHoaDonByDay: any = {};
      let tongTien = 0;
      let tongHD = 0;
      let dayCheck;
      if (i < 10)
        dayCheck = '0' + i;
      else
        dayCheck = i;
      that.danhSachHoaDon.forEach((item) => {
        let day = that.getDayInDate(item.ngayLapHd);
        let month = that.getMonthInDate(item.ngayLapHd);
        let year = that.getYearInDate(item.ngayLapHd);
        if (day == dayCheck && month == that.month && year == that.yearByMonth) {
          danhSachHoaDonFilterMonth.push(item);
          tongTien = +tongTien + +item.tongCong;
          tongHD = +tongHD + 1;
        }
      });
      thongTinHoaDonByDay.tongTien = tongTien;
      thongTinHoaDonByDay.tongHD = tongHD;
      thongTinHoaDonByDay.item = danhSachHoaDonFilterMonth;
      thongTinHoaDonByDay.ngay = dayCheck + '-' + that.month + '-' + that.yearByMonth
      that.danhSachHoaDonByMonth.push(thongTinHoaDonByDay);
    }
    that.danhSachHoaDonByMonth.forEach((item) => {
      that.tongCong = +that.tongCong + +item.tongTien;
      that.tongSLHoaDon = +that.tongSLHoaDon + +item.tongHD;
    });
  }

  seletedYear() {
    var that = this;
    that.tongCong = 0;
    that.tongSLHoaDon = 0;
    that.danhSachTongTienFilterYear = [];
    let thongTinHoaDonByDay: any = {};
    let monthCheck;
    for (let i = 1; i < 13; i++) {
      let tongTien = 0;
      if (i < 10)
        monthCheck = '0' + i;
      else
        monthCheck = i;
      that.danhSachHoaDon.forEach((item) => {
        let month = that.getMonthInDate(item.ngayLapHd);
        let year = that.getYearInDate(item.ngayLapHd);
        if (month == monthCheck && year == that.year) {
          tongTien = +tongTien + item.tongCong;
          that.tongCong = +that.tongCong + +item.tongCong;
          that.tongSLHoaDon = +that.tongSLHoaDon + 1;
        }
      });
      that.danhSachTongTienFilterYear.push(tongTien);
    }
    this.setDataChart(this.danhSachTongTienFilterYear);
  }

  selectdateHangHoa(){

  }
}
