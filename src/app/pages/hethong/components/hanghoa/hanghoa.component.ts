import {Component, ViewContainerRef} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import  {HangHoaService, DonViTinhService} from '../../../services/index'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'hanghoa',
  templateUrl: './hanghoa.html',
  styleUrls: ['./hanghoa.scss']
})

export class HangHoa {

  listHangHoa: any = [];
  listDonViTinh: any = [];
  display: boolean = false;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      confirmCreate: true,
      cancelButtonContent: '<i class="ion-close"></i>',

    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      confirmSave: true,
      cancelButtonContent: '<i class="ion-close"></i>',

    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true,
    },
    columns: {
      tenHang: {
        title: 'Tên Hàng',
        type: 'string',
      },
      slhienCo: {
        title: 'SL Hiện Có',
        type: 'number',
      },
      donGia: {
        title: 'Đơn Giá',
        type: 'number',
      },
      donViTinh: {
        title: 'Đơn Vị Tính',
        type: 'string',
      },
      ghiChu: {
        title: 'Ghi Chú',
        type: 'string',
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private hangHoaService: HangHoaService, public toastr: ToastsManager, vcr: ViewContainerRef, private donViTinhService: DonViTinhService) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.hangHoaService.getHangHoa().subscribe(
      response => {
        if (response.status) {
          this.listHangHoa = response.data;
          this.source.load(response.data);
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.hangHoaService.deleteHangHoa(event.data).subscribe(
        response => {
          if (response.status) {
            this.toastr.success(response.data.message, 'Success!')
            event.confirm.resolve();
          }
        },
        error => {
          this.toastr.error(error, 'Success!')
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event): void {
    this.hangHoaService.editHangHoa(event.newData).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!')
          event.confirm.resolve();
        }
      },
      error => {
        this.toastr.error(error, 'error!')
      }
    );
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.hangHoaService.newHangHoa(event.newData).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!');
          event.confirm.resolve();
        }
      },
      error => {
        event.confirm.reject();
        this.toastr.error(error, 'Error!');
      }
    );
  }

  onUserRowSelect(event): void {
    this.showDialog();
  }

  showDialog() {
    this.display = true;
  }
}


