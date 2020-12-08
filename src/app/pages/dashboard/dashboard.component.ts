import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit{

  data:any;

  private _data = {
    areaLineData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [5, 9, 7, 8, 5, 3, 5, 4]
      ]
    },
  };

  constructor() {
  }

  ngOnInit() {
    this.data = this._data;
  }
}
