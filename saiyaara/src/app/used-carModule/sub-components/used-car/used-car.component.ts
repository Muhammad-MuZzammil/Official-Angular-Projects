import { Component, OnInit } from '@angular/core';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import {baseUrl} from '../../../mainComponents/baseUrl'
import { CommonService } from './../../../common.service';

@Component({
  selector: 'used-car',
  templateUrl: './used-car.component.html',
  styleUrls: ['./used-car.component.css']
})
export class UsedCarComponent implements OnInit {
  generalVarArr=[]
  userData:any
  constructor(private transferDataService: TransferDataService,private commonSer: CommonService) {
  }
  ngOnInit() {
    this.generalVarArr['is_login'] = this.commonSer.is_login().subscribe(res => {
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
    this.transferDataService.transferQueryParams({})
  }

  ngOnDestroy() {
    if (this.generalVarArr['is_login']) {
      this.generalVarArr['is_login'].unsubscribe()
    }
  }

}
