import { UsedCarService } from './../../services/used-car.service';
import { imageUrl, renderingImgFunc, NumberWithCommas } from './../../../mainComponents/baseUrl';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'car-rate-under30-lacs',
  templateUrl: './car-rate-under30-lacs.component.html',
  styleUrls: ['./car-rate-under30-lacs.component.css']
})
export class CarRateUnder30LacsComponent implements OnInit, OnChanges {
  // carDetail:any = {'car_under_thirty_lac': []}
  carDetail
  public featureAdsImg
  usedCarImages = imageUrl
  numberWithCommas = NumberWithCommas
  constructor(private usedCarService: UsedCarService,private transferDataService:TransferDataService,private router:Router ) { }
  @Input() carDescs = {}
  ngOnInit() {

  }
  ngOnChanges(simple: SimpleChanges){
    this.carDetail = this.carDescs;
  }
  viewThirtyLac() {
    var viewTenLacCarObj = {
      priceRange:'3000000',
      min_price:2000000,
      max_price:3000000
    }

    this.transferDataService.transferData(viewTenLacCarObj)
    this.router.navigate(['/used-car'])

  }
}
