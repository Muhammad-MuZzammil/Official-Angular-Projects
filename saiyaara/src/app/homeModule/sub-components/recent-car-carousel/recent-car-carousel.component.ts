import { HomeService } from './../../services/home.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { imageUrl, renderingImgFunc, NumberWithCommas, imageSize, imageSize1, imageSize2 } from '../../../mainComponents/baseUrl';

@Component({
  selector: 'recent-car-carousel',
  templateUrl: './recent-car-carousel.component.html',
  styleUrls: ['./recent-car-carousel.component.css']
})
export class RecentCarCarouselComponent implements OnInit, OnChanges {
  public featureAdsImg
  usedCarImages = imageUrl
  imageSize1 = imageSize1
  imageSize2 = imageSize2
  imageSize = imageSize
  loading = false
  numberWithCommas = NumberWithCommas
  constructor(private homeService: HomeService) { }
  carDescs;
  @Input() recentCarCarousel:any

  ngOnInit() {
    this.loading = true
    setTimeout(() => {
      if(this.recentCarCarousel)
      {
        this.carDescs = this.recentCarCarousel.feature_ads
        this.loading = false
      }

    }, 1000);


  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.recentCarCarousel)
    {
      this.carDescs = this.recentCarCarousel.feature_ads
      this.loading = false
    }
  }


}
