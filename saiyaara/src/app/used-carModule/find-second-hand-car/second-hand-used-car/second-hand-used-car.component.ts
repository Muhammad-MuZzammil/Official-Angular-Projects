
import { Component, OnInit } from '@angular/core';
import {baseUrl} from '../../../mainComponents/baseUrl'
import { CommonService } from './../../../common.service';
import { UsedCarService } from '../../services/used-car.service';
import { TransferDataService } from '../../../generalServices/tranfer-data-service/transfer-data.service';
@Component({
  selector: 'second-hand-used-car',
  templateUrl: './second-hand-used-car.component.html',
  styleUrls: ['./second-hand-used-car.component.css']
})
export class SecondHandUsedCarComponent implements OnInit {
  userData:any;
  carDescs: any
  generalVarArr=[]
  constructor(private commonSer: CommonService, private usedCarService: UsedCarService, private transferDataService: TransferDataService){}
  ngOnInit() {
    this.generalVarArr['is_login'] =  this.commonSer.is_login().subscribe(res => {
      this.userData = res
      localStorage.setItem('userData', JSON.stringify(this.userData))
      if(this.userData.data.login == 'true'){
        localStorage.setItem("uHeartObj", JSON.stringify(this.userData.data.user_save_ad))
        this.transferDataService.transfersaveAdData(this.userData.data.user_save_ad.length)
      }
      else if(this.userData.data.login == 'false'){
        if(JSON.parse(localStorage.getItem("heartObj")))
          this.transferDataService.transfersaveAdData(JSON.parse(localStorage.getItem("heartObj")).length);
      }
      setTimeout(() => {
        this.userData = res
        localStorage.setItem('userData', JSON.stringify(this.userData))
        if(this.userData.data.login == 'true'){
          localStorage.setItem("uHeartObj", JSON.stringify(this.userData.data.user_save_ad))
          this.transferDataService.transfersaveAdData(this.userData.data.user_save_ad.length)
        }
        else if(this.userData.data.login == 'false'){
          if(JSON.parse(localStorage.getItem("heartObj")))
            this.transferDataService.transfersaveAdData(JSON.parse(localStorage.getItem("heartObj")).length);
        }
      }, 1000);
    });
    this.generalVarArr['secondHandCar'] =  this.usedCarService.secondHandCar()
      .subscribe(res => {
        this.carDescs = res
    });
    this.transferDataService.transferQueryParams({});
  }
  ngOnDestroy() {
    if (this.generalVarArr['is_login']) {
      this.generalVarArr['is_login'].unsubscribe()
    }
    if (this.generalVarArr['secondHandCar']) {
      this.generalVarArr['secondHandCar'].unsubscribe()
    }
  }
}
