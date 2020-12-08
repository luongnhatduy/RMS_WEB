import {Component, ViewContainerRef} from '@angular/core';

import {LocalDataSource} from 'ng2-smart-table';
import  {NhanVienService} from '../../../services/index'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'nhanvien',
  templateUrl: './nhanvien.html',
  styleUrls: ['./nhanvien.scss']
})
export class NhanVien {

  query: string = '';
  listNhanVien: any = [];

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
      taikhoan: {
        title: 'Tài Khoản',
        type: 'string',
      },
      matkhau: {
        title: 'Mật Khẩu',
        type: 'string'
      },
      ho: {
        title: 'Họ',
        type: 'string'
      },
      ten: {
        title: 'Tên',
        type: 'string'
      },
      diachi: {
        title: 'Địa Chỉ',
        type: 'string'
      },
      sdt: {
        title: 'SDT',
        type: 'number'
      },
      quyen: {
        title: 'Quyền',
        editor: {
          type: 'list',
          config: {
            list: [{title: 'Admin', value: 'Admin'}, {title: 'User', value: 'User'}]
          }
        }
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private nhanVienService: NhanVienService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.nhanVienService.getNhanVien().subscribe(
      response => {
        if (response.status) {
          this.listNhanVien = response.data;
          response.data.forEach(item => {
            item.matkhau = '********';
          });
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
      this.nhanVienService.deleteNhanVien(event.data).subscribe(
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
    var bool = false;
    for (var item in event.newData) {
      if (event.newData[item] === '') {
        bool = true;
        this.toastr.error(item + ' không được trống', 'Success!');
      }
    }
    this.listNhanVien.forEach(item => {
      if (item.taikhoan === event.newData.taikhoan && item.id !== event.newData.id) {
        bool = true;
        this.toastr.error('Tài Khoản không được trùng', 'Success!');
      }
    });

    if (!bool) {
      this.nhanVienService.editNhanVien(event.newData).subscribe(
        response => {
          if (response.status) {
            console.log(response);
            this.toastr.success(response.data.message, 'Success!')
            event.confirm.resolve();
          }
        },
        error => {
          this.toastr.error(error, 'Success!')
        }
      );
    }
  }

  onCreateConfirm(event): void {
    console.log(event);
    event.confirm.resolve();
    this.nhanVienService.newNhanVien(event.newData).subscribe(
      response => {
        if (response.status) {
          console.log(response);
          this.toastr.success(response.data.message, 'Success!')
          event.confirm.resolve();
        }
      },
      error => {
        this.toastr.error(error, 'Success!')
      }
    );
  }
}
