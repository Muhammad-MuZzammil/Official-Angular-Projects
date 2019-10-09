import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { baseUrl } from './../../../mainComponents/baseUrl';
import { CommonService } from './../../../common.service';
import { TransferDataService } from '../../../generalServices/tranfer-data-service/transfer-data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  generalVarArr = []
  constructor(private homeService: HomeService, private commonSer: CommonService, private transferDataService : TransferDataService) {
  }
  featureAdData: any
  userData: any
  ngOnInit() {
    this.generalVarArr['featureAds'] = this.homeService.featureAds()
      .subscribe(res => {
        this.featureAdData = res
      })
    this.generalVarArr['isLogin'] = this.commonSer.is_login().subscribe(res => {
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
    if (this.generalVarArr['isLogin']) {
      this.generalVarArr['isLogin'].unsubscribe()
    }
    if (this.generalVarArr['featureAds'])
      this.generalVarArr['featureAds'].unsubscribe()
  }
}
