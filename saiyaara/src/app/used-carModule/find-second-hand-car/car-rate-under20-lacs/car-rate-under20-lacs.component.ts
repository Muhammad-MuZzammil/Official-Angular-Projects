import { UsedCarService } from './../../services/used-car.service';
import { imageUrl, renderingImgFunc, NumberWithCommas, imageSize2 } from './../../../mainComponents/baseUrl';
import { Component, OnInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'car-rate-under20-lacs',
  templateUrl: './car-rate-under20-lacs.component.html',
  styleUrls: ['./car-rate-under20-lacs.component.css']
})
export class CarRateUnder20LacsComponent implements OnInit, OnChanges {

  public featureAdsImg
  usedCarImages = imageUrl
  numberWithCommas = NumberWithCommas
  carDetail:any
  imageSize2 = imageSize2
  @Input() carDescs = {}
  constructor(private usedCarService: UsedCarService,private transferDataService:TransferDataService,private router:Router) { }
  ngOnInit() {
    
  }
  ngOnChanges(simple: SimpleChanges) {
    this.carDetail = this.carDescs;
  }
  viewTwentyLac() {
    var viewTenLacCarObj = {
      priceRange:'2000000',
      min_price:1000000,
      max_price:2000000
    }

    this.transferDataService.transferData(viewTenLacCarObj)
    this.router.navigate(['/used-car'])

  }
}
