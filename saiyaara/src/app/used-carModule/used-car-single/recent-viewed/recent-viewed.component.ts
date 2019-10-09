import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { imageUrl, NumberWithCommas, imageSize1 } from '../../../mainComponents/baseUrl';
import { renderingImgFunc, imageSize,imageSize2 } from './../../../mainComponents/baseUrl';
import { Router, ActivatedRoute } from '@angular/router';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';

@Component({
  selector: 'recent-viewed',
  templateUrl: './recent-viewed.component.html',
  styleUrls: ['./recent-viewed.component.css']
})
export class RecentViewedComponent implements OnInit {
  @Input() recentViewInput = {};
  @Output() recentViewedCardata = new EventEmitter();
  carAdsImages = imageUrl;
  recentCarFlag = false
  featureAdsImg
  recentCars
  imageSize1 = imageSize1
  imageSize = imageSize
  numberWithCommas = NumberWithCommas
  imageSize2 = imageSize2
  loading: boolean = false
  constructor(private router: Router, private transferDataService: TransferDataService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((parameter: any) => {
      setTimeout(() => {
        this.recentViewCars();
      }, 1300)
    })
  }
  recentViewCars() {
    this.loading =true
    setTimeout(() => {
      this.recentCars = []
      this.recentCars = this.recentViewInput['data'].recent_viewed_ad
      this.loading =false

    }, 1000);
  }
  clickedSpecificCar(index) {
    let carObj = {
      id: index,
      recent_viewed_ad: localStorage.getItem('Response')
    }
    this.recentViewedCardata.emit(carObj)
  }
}
