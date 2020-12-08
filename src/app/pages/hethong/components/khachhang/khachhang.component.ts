import {Component, ViewContainerRef} from '@angular/core';

import {LocalDataSource} from 'ng2-smart-table';
import  {KhachHangService} from '../../../services/index'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'khachhang',
  templateUrl: './khachhang.html',
  styleUrls: ['./khachhang.scss']
})

export class KhachHang {

  listKhachHang: any = [];
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
      tenkhachhang: {
        title: 'Khách Hàng',
        type: 'string',
      },
      diachi: {
        title: 'Địa Chỉ',
        type: 'string'
      },
      sdt: {
        title: 'SĐT',
        type: 'number'
      },
      email: {
        title: 'email',
        type: 'string'
      },
      diemthuong: {
        title: 'Điểm Thưởng',
        type: 'number',
        editable: false,
      },
      ghichu: {
        title: 'Ghi Chú',
        type: 'string'
      },
      the: {
        title: 'Thẻ Ưu Đãi',
        editor: {
          type: 'list',
          config: {
            list: [{title: 'VIP', value: 'VIP'}, {title: 'CUSTOMER', value: 'CUSTOMER'}]
          }
        }
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private khachHangService: KhachHangService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.getData();
  }

  getData() {
    this.khachHangService.getKhachHang().subscribe(
      response => {
        if (response.status) {
          this.listKhachHang = response.data;
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
      this.khachHangService.deleteKhachHang(event.data).subscribe(
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
    this.khachHangService.editKhachHang(event.newData).subscribe(
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

    this.khachHangService.newKhachHang(event.newData).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!');
          event.confirm.resolve();
          this.getData();
        }
      },
      error => {
        this.toastr.error(error, 'Success!')
      }
    );
  }

  onUserRowSelect(event): void {
    console.log(event);
    this.showDialog();
  }

  showDialog() {
    this.display = true;
  }
}
