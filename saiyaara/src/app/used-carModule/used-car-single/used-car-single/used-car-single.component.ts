import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/app/mainComponents/baseUrl';
import { CommonService } from '../../../common.service';
import { TransferDataService } from '../../../generalServices/tranfer-data-service/transfer-data.service';

declare var jQuery: any;
@Component({
  selector: 'used-car-single',
  templateUrl: './used-car-single.component.html',
  styleUrls: ['./used-car-single.component.css']
})
export class UsedCarSingleComponent implements OnInit {
  userData: any;
  generalVarArr=[]
  constructor(private commonSer: CommonService, private transferDataService: TransferDataService) {
  }
  ngOnInit() {
    this.onActivate() //scrolltop
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
  onActivate() {
    jQuery('html, body').animate({
        scrollTop: 0
    }, 200);
  }

  ngOnDestroy() {
    if (this.generalVarArr['is_login']) {
      this.generalVarArr['is_login'].unsubscribe()
    }
  }

}
