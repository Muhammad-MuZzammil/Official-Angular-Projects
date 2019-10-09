import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/app/mainComponents/baseUrl';
import { CommonService } from '../../../common.service';
import { DealerSingleService } from '../../services/dealer-single.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { TransferDataService } from '../../../generalServices/tranfer-data-service/transfer-data.service';

@Component({
  selector: 'car-dealer-single',
  templateUrl: './car-dealer-single.component.html',
  styleUrls: ['./car-dealer-single.component.css']
})
export class CarDealerSingleComponent implements OnInit {
  userData: any;
  generalVarArr=[]
  showroomAds
  constructor(private commonSer: CommonService, private dealerSingleService: DealerSingleService, private activeRoute: ActivatedRoute, private transferDataService: TransferDataService) { }

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
    this.activeRoute.params.subscribe((parameter: any) => {
      this.generalVarArr['getSingleDealer'] = this.dealerSingleService.getSingleDealer({id: parameter['id']})
      .subscribe(res => {
        this.showroomAds  = res
      })
    })
    this.transferDataService.transferQueryParams({});
  }
  ngOnDestroy() {
    if (this.generalVarArr['is_login'])
      this.generalVarArr['is_login'].unsubscribe()
    if (this.generalVarArr['getSingleDealer'])
      this.generalVarArr['getSingleDealer'].unsubscribe()  
  }
  // pagination(curPage){
  //   this.globalCV = curPage
  //   this.firstPrevDisable = (curPage == 0) ? true : false;
  //   this.lastNextDisable = (this.showroms.last_page == curPage+1) ? true : false;
  //   this.dealerFilterSidebar()
  //   this.startOff = curPage
  //   if(this.showroms.last_page == (curPage+1))
  //     this.startOff = this.startOff -1
  // }
}
