import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {DonDatHangService} from '../../../services/dondathang.service';
import {DonDatHang} from '../../../models/dondathang';
import {NhanVien} from '../../../models/nhanvien';
import {NhaCungCap} from '../../../models/nhacungcap';
import {NhaCungCapService} from '../../../services/nhacungcap.service';
import {HangHoa} from '../../../models/hanghoa';
import {HangHoaService} from '../../../services/hanghoa.service';
import {CTDonDatHang} from '../../../models/ctdondathang';
import {PhieuNhap} from '../../../models/phieunhap';
import {PhieuNhapService} from '../../../services/phieunhap.service';
import {CTPhieuNhap} from '../../../models/ctphieunhap';

@Component({
  selector: 'dathang',
  templateUrl: './dathang.html',
})

export class DatHang implements OnInit {

  danhSachDonDatHang: DonDatHang[];
  displayDialogDonDatHang: boolean;
  detailDonDatHang: DonDatHang;
  tongSLHangDat: number;
  displayDialogTaoDonDatHang: boolean = false;
  donDatHangObject: DonDatHang;
  tenNhaCungCap: string;
  nhaCungCap: NhaCungCap;
  filteredBrands: any[];
  danhSachNhaCungCap: NhaCungCap[];
  danhSachHangHoa: HangHoa[];
  orderHangHoas: CTDonDatHang[];
  orderHangHoa: CTDonDatHang;
  tongCongDatHang: number = 0;

  danhSachPhieuNhap: PhieuNhap[];

  ctPhieuNhap: CTPhieuNhap[];

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private donDatHangservice: DonDatHangService, private nhaCungCapService: NhaCungCapService,
              private hangHoaService: HangHoaService, private phieuNhapService: PhieuNhapService) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.danhSachDonDatHang = [];
    this.danhSachPhieuNhap = [];
    this.tongSLHangDat = 0;
    this.donDatHangObject = new DonDatHang();
    this.donDatHangObject.nhanVien = new NhanVien();
    this.nhaCungCap = new NhaCungCap();
  }

  ngOnInit() {
    var that = this;
    that.getDonDatHang();
    that.getNCC();
    that.getHanghoa();
    this.getPhieuNhap();
  }

  getDonDatHang() {
    this.donDatHangservice.getDonDatHang().subscribe(
      response => {
        if (response.status) {
          this.danhSachDonDatHang = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  getNCC() {
    this.nhaCungCapService.getNhaCungCap().subscribe(
      response => {
        if (response.status) {
          this.danhSachNhaCungCap = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  getPhieuNhap() {
    this.phieuNhapService.getPhieuNhap().subscribe(
      response => {
        if (response.status) {
          this.danhSachPhieuNhap = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  getHanghoa() {
    this.hangHoaService.getHangHoa().subscribe(
      response => {
        if (response.status) {
          this.danhSachHangHoa = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  showDetailDonDatHang(data) {
    var that = this;
    that.displayDialogDonDatHang = true;
    that.detailDonDatHang = data;
    that.detailDonDatHang.CTDonDatHang = [];
    that.tongSLHangDat = 0;
    that.donDatHangservice.getCTDonDatHangByDDHID(that.detailDonDatHang.iddonDatHang).subscribe(
      response => {
        if (response.status) {
          that.detailDonDatHang.CTDonDatHang = response.data;
          that.detailDonDatHang.CTDonDatHang.forEach((item) => {
            that.tongSLHangDat = +that.tongSLHangDat + +item.sldat;
          })
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  onDialogHideDonDatHang() {
    this.displayDialogDonDatHang = false;
  }

  onDialogHideTaoDonDatHang() {
    this.displayDialogTaoDonDatHang = false;
  }

  addDonDatHang() {
    var that = this;
    that.orderHangHoas = [];
    that.tenNhaCungCap = '';
    that.donDatHangObject = new DonDatHang();
    that.displayDialogTaoDonDatHang = true;
    let today = new Date();
    that.donDatHangObject.ngayDatHang = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    let nhaVien: any = JSON.parse(localStorage.getItem('currentUser'));
    let nv = new NhanVien();
    nv.idnhanVien = nhaVien.id;
    nv.ho = nhaVien.ho;
    nv.ten = nhaVien.ten;
    that.donDatHangObject.nhanVien = nv;
  }

  filterNhaCungCap(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.danhSachNhaCungCap.length; i++) {
      let ncc = this.danhSachNhaCungCap[i];
      if (ncc.tenNcc.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredBrands.push(ncc);
      }
    }
  }

  handleDropdownClick(event) {
    this.filteredBrands = [];
    setTimeout(() => {
      this.filteredBrands = this.danhSachNhaCungCap;
    }, 100)
    console.log(event);
  }

  captureId(event) {
    this.tenNhaCungCap = event.tenNcc;
    this.nhaCungCap = event;
  }

  onRowSelect(event) {
    var that = this;
    console.log(event.data);
    let bool = false;
    that.tongCongDatHang = 0;
    that.orderHangHoas.forEach((item) => {
      if (event.data.idhangHoa === item.hangHoa.idhangHoa) {
        item.sldat = +item.sldat + 1;
        that.tongCongDatHang = +that.tongCongDatHang + 1;
        bool = true;
      }
    });
    if (!bool) {
      that.orderHangHoa = new CTDonDatHang();
      that.orderHangHoa.hangHoa = event.data;
      that.orderHangHoa.sldat = 1;
      that.tongCongDatHang = +that.tongCongDatHang + 1;
      that.orderHangHoas.push(JSON.parse(JSON.stringify(this.orderHangHoa)));
    }
  }

  upSoLuong(item) {
    var that = this;
    that.orderHangHoas.forEach((data) => {
      if (item.hangHoa.idhangHoa === data.hangHoa.idhangHoa) {
        data.sldat = +data.sldat + 1;
        that.tongCongDatHang = +that.tongCongDatHang + 1;
      }
    });
  }

  downSoLuong(item) {
    var that = this;
    for (let i = 0; i < this.orderHangHoas.length; i++) {
      if (item.hangHoa.idhangHoa === that.orderHangHoas[i].hangHoa.idhangHoa) {
        that.orderHangHoas[i].sldat = +that.orderHangHoas[i].sldat - 1;
        that.tongCongDatHang = +that.tongCongDatHang + 1;
        if (this.orderHangHoas[i].sldat === 0) {
          that.orderHangHoas.splice(i, 1);
        }
      }
    }
  }

  submitDonDatHang(data) {
    var that = this;
    that.nhaCungCap.ngayKt = null;
    that.nhaCungCap.ngayBd = null;
    this.donDatHangservice.addNewDonDatHang(that.nhaCungCap, data.nhanVien, 0).subscribe(
      response => {
        if (response) {
          that.orderHangHoas.forEach((item) => {
            item.donDatHang = new DonDatHang();
            item.donDatHang.iddonDatHang = +response;
            item.hangHoa.donViTinh = null;
            item.hangHoa.slhienCo = null;
          });
          var orderobjJson = JSON.stringify(that.orderHangHoas);
          this.donDatHangservice.addNewCTDonDatHang(orderobjJson).subscribe(
            response => {
              if (response.status) {
                that.displayDialogTaoDonDatHang = false;
                that.ngOnInit();
                this.toastr.success(response.data.message, 'Success!');
              }
            },
            error => {
              console.log("err");
            }
          );
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  nhapHang(data) {
    var that = this;
    if (data.trangThai === 0) {
      that.ctPhieuNhap = [];
      let nhaVien: any = JSON.parse(localStorage.getItem('currentUser'));
      let nv = new NhanVien();
      nv.idnhanVien = nhaVien.id;
      let donDatHangObj = new DonDatHang();
      donDatHangObj.iddonDatHang = data.iddonDatHang;
      this.phieuNhapService.addPhieuNhap(donDatHangObj, nv).subscribe(
        response => {
          if (response) {
            data.CTDonDatHang.forEach((item) => {
              let objectCtPhieuNhap = new CTPhieuNhap();
              objectCtPhieuNhap.hangHoa = new HangHoa();
              objectCtPhieuNhap.phieuNhap = new PhieuNhap();
              objectCtPhieuNhap.hangHoa.idhangHoa = item.hangHoa.idhangHoa;
              objectCtPhieuNhap.phieuNhap.idphieuNhap = +response;
              objectCtPhieuNhap.slNhap = item.sldat;
              that.ctPhieuNhap.push(objectCtPhieuNhap);
            });
            var CtPhieuNhapJson = JSON.stringify(that.ctPhieuNhap);
            this.phieuNhapService.addCTPhieuNhap(CtPhieuNhapJson).subscribe(
              response => {
                if (response.status) {
                  this.donDatHangservice.updateDonDatHang(data).subscribe(
                    response => {
                      if (response.status) {
                        that.displayDialogDonDatHang = false;
                        that.ngOnInit();
                        this.toastr.success(response.data.message, 'Success!');
                      }
                    },
                    error => {
                      console.log("err");
                    }
                  );
                }
              },
              error => {
                console.log("err");
              }
            );
          }
        },
        error => {
          console.log("err");
        }
      );
    }
  }
}
