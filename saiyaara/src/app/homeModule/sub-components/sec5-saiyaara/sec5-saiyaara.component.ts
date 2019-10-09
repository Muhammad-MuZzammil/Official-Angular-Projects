import { imageUrl, renderingImgFunc, NumberWithCommas, imageSize, imageSize1 } from './../../../mainComponents/baseUrl';
import { HomeService } from './../../services/home.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UsedCarService } from './../../../used-carModule/services/used-car.service';
declare var jQuery: any;
@Component({
  selector: 'sec5-saiyaara',
  templateUrl: './sec5-saiyaara.component.html',
  styleUrls: ['./sec5-saiyaara.component.css']
})
export class Sec5SaiyaaraComponent implements OnInit, OnChanges {
@Input() popularUsedCar:any

  popularCars
  public featureAdsImg
  usedCarImages = imageUrl
  loading = false
  contactNumber
  cellNumCount
  imageSize1 = imageSize1
  imageSize = imageSize
  numberWithCommas = NumberWithCommas
  constructor(private homeService: HomeService, private usedCarService: UsedCarService) { }

  ngOnInit() {
    this.loading = true
    setTimeout(() => {
      if(this.popularUsedCar)
      {
        this.popularCars = this.popularUsedCar.all_ads
        for (let i = 0; i < this.popularCars.length; i++) {

          this.contactNumber = this.popularCars[i].cell_number
          this.cellNumCount = this.popularCars[i].number_counter
        }
        this.loading = false
      }
  }, 1000);

  }


  ngOnChanges(changes: SimpleChanges) {
    if(this.popularUsedCar)
    {
      this.popularCars = this.popularUsedCar.all_ads
      for (let i = 0; i < this.popularCars.length; i++) {

        this.contactNumber = this.popularCars[i].cell_number
        this.cellNumCount = this.popularCars[i].number_counter
      }
      this.loading = false
    }
  }
}
