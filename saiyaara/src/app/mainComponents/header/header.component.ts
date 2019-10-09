import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { TransferDataService } from './../../generalServices/tranfer-data-service/transfer-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() showCount: any
  userData;
  heartAdsArr = []
  generalFieldArr = {'saveAdsCount': 0};
  total_car_count
  generalVarArr=[]
  uheartAdsArr: any;
  uheartAdsID: any[];
  queryPara
  constructor(private router: Router, private transferDataService: TransferDataService) {
  }
  ngOnInit() {
    this.saveAdsFN()
    this.totalCarCount()
    this.transferDataService.queryPara
    .subscribe(data => {
      this.queryPara = {};
      this.queryPara = data;
    })
  }
  totalCarCount() {
    this.total_car_count = sessionStorage.getItem('total_car_count')
    setTimeout(() => {
      this.total_car_count = sessionStorage.getItem('total_car_count')
      this.userData = localStorage.getItem('userData') ? JSON.parse (localStorage.getItem('userData')) : null

    }, 1000);
    this.router.events.subscribe((event) => {
      setTimeout(() => {
        this.userData = localStorage.getItem('userData') ? JSON.parse (localStorage.getItem('userData')) : null
      }, 1000);
    });
  }
  saveAdsFN() {
    this.generalVarArr['currentSaveAdData'] = this.transferDataService.currentSaveAdData
    .subscribe(data => {
      this.generalFieldArr["saveAdsCount"] = data
    })
  }
  ngOnDestroy() {
    if (this.generalVarArr['currentSaveAdData']) {
      this.generalVarArr['currentSaveAdData'].unsubscribe()
    }
  }
}
