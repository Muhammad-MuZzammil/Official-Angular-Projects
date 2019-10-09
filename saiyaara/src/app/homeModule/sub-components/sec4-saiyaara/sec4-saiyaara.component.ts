import { renderingImgFunc, imageMUrl } from './../../../mainComponents/baseUrl';
import { HomeService } from './../../services/home.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sec4-saiyaara',
  templateUrl: './sec4-saiyaara.component.html',
  styleUrls: ['./sec4-saiyaara.component.css']
})
export class Sec4SaiyaaraComponent implements OnInit, OnChanges {

  constructor(private homeService: HomeService, private router: Router, private transferDataService: TransferDataService) { }
@Input() popularBrand:any
  popularBrands
  allPopularBrands
  popularImgLogo = imageMUrl
  popularCarSearches
  loading = false
  ngOnInit() {
    this.loading = true
    setTimeout(() => {
      if(this.popularBrand)
      {
        this.popularBrands = this.popularBrand.popular_brands
        this.allPopularBrands = this.popularBrand.all_popular_brands
        this.popularCarSearches = this.popularBrand.popular_car_searches
        this.loading = false
      }
    }, 1000);
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.popularBrand)
    {
      this.popularBrands = this.popularBrand.popular_brands
      this.allPopularBrands = this.popularBrand.all_popular_brands
      this.popularCarSearches = this.popularBrand.popular_car_searches
      this.loading = false
    }
  }

}
