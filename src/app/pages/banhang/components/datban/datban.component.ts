import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DatBanService} from '../../../services/index';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {DatBanModel} from '../../../models/datban';
import {Ban} from '../../../models/ban';
import {BanService} from '../../../services/ban.service';
import {CTMenuService} from '../../../services/ctmenu.service';
import {CTMenu} from '../../../models/ctmenu';
import {MonAnService} from '../../../services/monan.service';
import {MonAn} from '../../../models/monan';
import {HoaDonService} from '../../../services/hoadon.service';
import {KhachHang} from '../../../models/khachhang';
import {NhanVien} from '../../../models/nhanvien';
import {KhachHangService} from '../../../services/khachhang.service';
import {Menu} from '../../../models/menu';
import {HangHoaService} from '../../../services/hanghoa.service';

@Component({
  selector: 'datban',
  templateUrl: './datban.html',
})

export class DatBan implements OnInit {

  danhSachDatBan: DatBanModel[];
  danhSachBan: Ban[];
  displayDialog: boolean;
  banDetail: Ban;
  datBanDetail: DatBanModel;
  displayDialogDatBan: boolean;
  danhSachCTmenu: CTMenu[];
  ctMenuDetail: CTMenu[];
  danhSachMonAn: MonAn[];
  tongCong: number = 0;
  displayDialogOrder: boolean;
  orderObj: DatBanModel;
  orderMonAn: CTMenu[];
  ctmenuOrder: CTMenu;
  tongtien: number = 0;
  danhSachKhachHang: KhachHang[];
  khachhang: KhachHang;
  sdt: string;
  menu: Menu;
  ban: Ban;
  type: boolean = true;
  danhSachChiTietDatMonAn: CTMenu[];

  constructor(private datBanService: DatBanService, public toastr: ToastsManager, vcr: ViewContainerRef, private banService: BanService,
              private ctMenu: CTMenuService, private monAnService: MonAnService, private hoaDonService: HoaDonService, private khachHangService: KhachHangService, private hangHoaService: HangHoaService) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.ctMenuDetail = [];
    this.orderMonAn = [];
    this.khachhang = new KhachHang;
    this.ban = new Ban;
    this.danhSachChiTietDatMonAn = [];
  }

  ngOnInit() {
    this.datBanService.getDatBan().subscribe(
      response => {
        if (response.status) {
          this.danhSachDatBan = response.data;
          // this.danhSachDatBan.forEach(function (item) {
          //   let date = new Date(item.ngayGioDat)
          //   item.ngayGioDat = date.getDay() + '-' + date.getMonth() + 1 + '-' +
          //     date.getFullYear();
          //
          // })
        }
      },
      error => {
        console.log("err");
      }
    );
    this.banService.getBan().subscribe(
      response => {
        if (response.status) {
          this.danhSachBan = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.ctMenu.getctmenu().subscribe(
      response => {
        if (response.status) {
          this.danhSachCTmenu = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.monAnService.getMonAn().subscribe(
      response => {
        if (response.status) {
          this.danhSachMonAn = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
    this.khachHangService.getKhachHang().subscribe(
      response => {
        if (response.status) {
          this.danhSachKhachHang = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }


  changeStatus(event, id) {
    var that = this;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.danhSachDatBan.forEach(function (item) {
      if (item.iddatBan === id) {
        item.trangThai = +value;
        that.updateDatBan(item);
      }
    });
  };

  updateDatBan(datban) {
    this.datBanService.updateDatBanService(datban).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!')
        }
      },
      error => {
        this.toastr.error(error, 'error!')
      }
    );
  }

  contextMenu() {
    return false;
  }

  viewDatBan(data: any) {
    var that = this;
    that.ctMenuDetail = [];
    that.ban = data;
    if (!data.trangThai) {
      that.banDetail = null;
      that.displayDialog = true;
      that.banDetail = data;
    } else {
      that.displayDialogDatBan = true;
      that.datBanDetail = null;
      that.danhSachDatBan.forEach((item) => {
        if (item.ban.idban === data.idban && !item.trangThai) {
          that.datBanDetail = item;
          return;
        }
      });

      this.danhSachCTmenu.forEach((item) => {
        if (this.datBanDetail.menu.idmenu === item.menu.idmenu) {
          this.danhSachMonAn.forEach((monan) => {
            if (item.monAn.idmonAn === monan.idmonAn) {
              item.monAn = monan;
            }
          });
          this.ctMenuDetail.push(item);
        }
      });

      this.ctMenuDetail.forEach((item) => {
        this.tongCong = this.tongCong + (+item.monAn.bangGia[0].gia * +item.soluong);
      });
    }
  }

  onDialogHideDatBan() {
    this.displayDialogDatBan = false;
    this.datBanDetail = null;
  }

  onDialogHideBan() {
    this.displayDialog = false;
    this.banDetail = null;
  }

  onCreateHoaDon(datban: DatBanModel, khachHang: KhachHang, nhanVien: NhanVien, status: number): void {
    this.hoaDonService.addNewHoaDon(datban, khachHang, nhanVien, status).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!');
          this.displayDialogDatBan = false;
          this.datBanDetail = null;
          this.ngOnInit();
        }
      },
      error => {
        this.toastr.error(error, 'Success!')
      }
    );
  }

  capNhatDatBan(data) {
    this.type = true;
    this.orderMonAn = [];
    this.tongtien = 0;
    this.khachhang = new KhachHang;
    this.displayDialogOrder = true;
    this.orderObj = new DatBanModel;
    this.orderObj.ban = data;
    this.sdt = "";
  }

  chooseMonAn(data) {
    let bool = false;
    this.tongtien = data.bangGia[0].gia;
    this.orderMonAn.forEach((item) => {
      this.tongtien = +this.tongtien + (+item.soluong * +item.monAn.bangGia[0].gia);
      if (item.monAn.idmonAn === data.idmonAn) {
        item.soluong = +item.soluong + 1;
        bool = true;
      }
    })
    if (!bool) {
      this.ctmenuOrder = new CTMenu();
      this.ctmenuOrder.monAn = data;
      this.orderMonAn.push(this.ctmenuOrder);
    }
  }

  upSoLuong(item) {
    this.orderMonAn.forEach((data) => {
      if (item.monAn.idmonAn === data.monAn.idmonAn) {
        data.soluong = +data.soluong + 1;
        this.tongtien = this.tongtien + (+data.monAn.bangGia[0].gia);
      }
    });
  }

  downSoLuong(item) {
    for (let i = 0; i < this.orderMonAn.length; i++) {
      if (item.monAn.idmonAn === this.orderMonAn[i].monAn.idmonAn) {
        this.orderMonAn[i].soluong = +this.orderMonAn[i].soluong - 1;
        this.tongtien = this.tongtien - (+this.orderMonAn[i].monAn.bangGia[0].gia);
        if (this.orderMonAn[i].soluong === 0) {
          this.orderMonAn.splice(i, 1);
        }
      }
    }
  }

  filteredBrands: any[];

  handleDropdownClick(event) {
    this.filteredBrands = [];
    setTimeout(() => {
      this.filteredBrands = this.danhSachKhachHang;
    }, 100)
    console.log(event);
  }

  filterKhachHang(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.danhSachKhachHang.length; i++) {
      let khachHang = this.danhSachKhachHang[i];
      if (khachHang.sdt.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(khachHang);
      }
    }
  }

  captureId(event) {
    this.sdt = event.sdt;
    this.khachhang = event;
  }

  submitDatBan(orderMonAn) {
    var that = this;
    that.danhSachChiTietDatMonAn = JSON.parse(JSON.stringify(orderMonAn));
    let monAnDinhLuongs: any = [];

    that.danhSachChiTietDatMonAn.forEach((item) => {
      let monAnDinhLuong: any = {};
      item.monAn.dinhLuong.forEach((dinhLuong) => {
        monAnDinhLuong.idhangHoa = dinhLuong.hangHoa.idhangHoa;
        monAnDinhLuong.slhienCo = +item.soluong * +dinhLuong.sl;
        monAnDinhLuongs.push(monAnDinhLuong);
      });
    });
    console.log(monAnDinhLuongs);
    that.menu = new Menu;
    that.menu.tenMenu = Math.floor((Math.random() * 10000) + 1) + "";
    that.ctMenu.addNewMenu(this.menu).subscribe(
      response => {
        if (response.status) {
          that.menu = response.data;
          orderMonAn.forEach((item) => {
            item.monAn.dinhLuong = null;
            item.menu = response.data;
          });
          var myJsonString = JSON.stringify(orderMonAn);
          that.ctMenu.addNewCTMenu(myJsonString).subscribe(
            response => {
              if (response.status) {
                let nhaVien: any = JSON.parse(localStorage.getItem('currentUser'));
                let nv = new NhanVien();
                nv.idnhanVien = nhaVien.id;
                let kh = new KhachHang();
                kh.idkhachHang = this.khachhang.idkhachHang;
                that.orderObj.khachHang = kh;
                that.orderObj.menu = this.menu;

                that.orderObj.trangThai = 0;
                that.orderObj.nhanVien = nv;
                var orderobjJson = JSON.stringify(this.orderObj);
                that.datBanService.addDatBanService(orderobjJson).subscribe(
                  response => {
                    if (response.status) {
                      var JsonSlHangHoa = JSON.stringify(monAnDinhLuongs);
                      that.hangHoaService.updateSoLuongHangHoa(JsonSlHangHoa).subscribe(
                        response => {
                          if (response.status) {
                            that.toastr.success(response.data.message, 'Success!');
                            that.ngOnInit();
                            that.displayDialogOrder = false;
                          }
                        },
                        error => {
                          console.log("err");
                        }
                      );
                    }
                  },
                  error => {
                    that.toastr.error(error, 'Success!')
                  }
                );
              }
            },
            error => {
              that.toastr.error(error, 'Success!')
            }
          );
        }
      },
      error => {
        that.toastr.error(error, 'Success!')
      }
    );
  }

  chinhSuaDatBan(data) {
    var that = this;
    this.type = false;
    this.orderMonAn = [];
    this.tongtien = 0;
    this.khachhang = new KhachHang;
    this.orderObj = new DatBanModel;
    this.orderObj.ban = data;
    this.sdt = "";
    that.ctMenuDetail = [];
    that.ban = data;
    this.displayDialogOrder = true;
    this.danhSachDatBan.forEach((item) => {
      if (item.ban.idban === data.idban) {
        that.datBanDetail = item;
        return;
      }
    });

    this.danhSachCTmenu.forEach((item) => {
      if (that.datBanDetail.menu.idmenu === item.menu.idmenu) {
        that.danhSachMonAn.forEach((monan) => {
          if (item.monAn.idmonAn === monan.idmonAn) {
            item.monAn = monan;
          }
        });
        that.orderMonAn.push(item);
      }
    });
    this.orderMonAn.forEach((item) => {
      this.tongtien = this.tongtien + (+item.monAn.bangGia[0].gia * +item.soluong);
    });
  }
}
