import { UsedCarService } from './../../services/used-car.service';
import { imageUrl, renderingImgFunc, NumberWithCommas, imageSize2 } from './../../../mainComponents/baseUrl';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
declare var jQuery;
@Component({
  selector: 'car-rate-under10-lacs',
  templateUrl: './car-rate-under10-lacs.component.html',
  styleUrls: ['./car-rate-under10-lacs.component.css']
})
export class CarRateUnder10LacsComponent implements OnInit, OnChanges {
 
  public loading = false;
  imageSize2 = imageSize2
  public featureAdsImg
  usedCarImages = imageUrl
  numberWithCommas = NumberWithCommas
  // carDetail:any = {'car_under_ten_lac': []}
  carDetail:any
  constructor(
    private usedCarService: UsedCarService,
    private transferDataService: TransferDataService,
    private router: Router,

  ) { }
  @Input() carDescs = {}
  ngOnInit() {
  }
  ngOnChanges(simple: SimpleChanges) {
    this.carDetail = this.carDescs;
  }
  viewTenLac() {
    var viewTenLacCarObj = {
      priceRange: '1000000',
      min_price: 1,
      max_price: 1000000
    }
    this.transferDataService.transferData(viewTenLacCarObj)
    this.router.navigate(['/used-car'])
  }
}