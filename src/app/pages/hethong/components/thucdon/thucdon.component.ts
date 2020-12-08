import {Component} from '@angular/core';
import {MonAn} from '../../../models/index'
import {MonAnService} from  '../../../services/monan.service'
import {OnInit} from '@angular/core';


@Component({
  selector: 'thucdon',
  templateUrl: './thucdon.html',
})

export class ThucDon implements OnInit {

  monAn: MonAn[];

  selectedCar: MonAn;

  displayDialog: boolean;
  displayDialogAddMenu: boolean;

  constructor(private carService: MonAnService) {
  }

  ngOnInit() {
    this.carService.getMonAn().subscribe(
      response => {
        if (response.status) {
          this.monAn = response.data;
        }
      },
      error => {
        console.log("err");
      }
    );
  }

  selectCar(car: MonAn) {
    this.selectedCar = car;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedCar = null;
  }

  AddMenu(){
    this.displayDialogAddMenu = true;
  }
}
