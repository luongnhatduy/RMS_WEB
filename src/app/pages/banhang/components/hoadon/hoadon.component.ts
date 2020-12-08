import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {HoaDonService} from '../../../services/hoadon.service';
import {HoaDonModel} from '../../../models/hoadon';
import {MonAnService} from '../../../services/monan.service';
import {MonAn} from '../../../models/monan';
import {CTMenuService} from '../../../services/ctmenu.service';
import {CTMenu} from '../../../models/ctmenu';
import {Observable} from 'rxjs';
import {DatBanModel} from '../../../models/datban';
import {KhachHang} from '../../../models/khachhang';
import {NhanVien} from '../../../models/nhanvien';

@Component({
  selector: 'hoadon',
  templateUrl: './hoadon.html',
})

export class HoaDon implements OnInit {

  danhSachHoaDon: HoaDonModel[];
  danhSachMonAn: MonAn[];
  danhSachCTmenu: CTMenu[];
  displayDialog: boolean;
  detailHoaDon: HoaDonModel;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private ctMenu: CTMenuService, private hoaDonService: HoaDonService, private monAnService: MonAnService) {
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    var that = this;
    this.getHoaDon();
    this.getMonAn();
    this.getCTMenu();
  }

  getHoaDon() {
    this.hoaDonService.getHoaDon().subscribe(
      response => {
        if (response.status) {
          this.danhSachHoaDon = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  getCTMenu() {
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
  }

  getMonAn() {
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
  }

  convertData() {
    this.danhSachHoaDon.forEach((item) => {
      item.monAn = [];
      item.ctMenu = [];
      item.tongCong = 0;
      this.danhSachCTmenu.forEach((dataCTMenu) => {
        if (item.datBan.menu.idmenu === dataCTMenu.id.idmenu) {
          this.danhSachMonAn.forEach((monan) => {
            if (monan.idmonAn === dataCTMenu.id.idmonAn) {
              item.monAn.push(monan);
              item.tongCong = +item.tongCong + +monan.bangGia[0].gia * +dataCTMenu.soluong;
            }
          });
          item.ctMenu.push(dataCTMenu);
        }
      });
    });
  }

  showDetailHoaDon(data) {
    this.convertData();
    this.displayDialog = true;
    this.detailHoaDon = data;
  }

  onDialogHide() {
    this.displayDialog = false;
  }

  onUpdateHoaDon(datban: DatBanModel, khachHang: KhachHang, nhanVien: NhanVien, status: number, idhoaDon: number): void {
    this.hoaDonService.updateNewHoaDon(datban, khachHang, nhanVien, status, idhoaDon).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!');
          this.displayDialog = false;
          this.ngOnInit();
        }
      },
      error => {
        this.toastr.error(error, 'Success!')
      }
    );
  }
}
