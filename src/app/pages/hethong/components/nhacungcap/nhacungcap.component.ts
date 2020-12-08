import {Component, ViewContainerRef} from '@angular/core';

import {LocalDataSource} from 'ng2-smart-table';
import  {NhaCungCapService} from '../../../services/index'
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'nhacungcap',
  templateUrl: './nhacungcap.html',
  styleUrls: ['./nhacungcap.scss']
})
export class NhaCungCap {

  query: string = '';
  listNhaCungCap: any = [];

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
      tenNcc: {
        title: 'Tên Nhà Cung Cấp',
        type: 'string',
      },
      diaChi: {
        title: 'Địa Chỉ',
        type: 'string'
      },
      sdt: {
        title: 'SĐT',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      ngayBd: {
        title: 'Ngày Bắt Đầu',
        type: 'date',
        editable: false,
      },
      ngayKt: {
        title: 'Ngày Kết Thúc',
        type: 'date'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private nhaCungCapService: NhaCungCapService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.getData();
  }

  getData(): void {
    this.nhaCungCapService.getNhaCungCap().subscribe(
      response => {
        if (response.status) {
          this.listNhaCungCap = response.data;
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
      this.nhaCungCapService.deleteNhaCupCap(event.data).subscribe(
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
    this.nhaCungCapService.editNhaCungCap(event.newData).subscribe(
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
    this.nhaCungCapService.newNhaCungCap(event.newData).subscribe(
      response => {
        if (response.status) {
          this.toastr.success(response.data.message, 'Success!');
          this.getData();
         // event.confirm.resolve();
        }
      },
      error => {
        event.confirm.reject();
        this.toastr.error(error, 'Error!');
      }
    );
  }

}
