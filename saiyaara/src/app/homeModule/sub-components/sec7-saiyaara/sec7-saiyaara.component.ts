import { HomeService } from './../../services/home.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sec7-saiyaara',
  templateUrl: './sec7-saiyaara.component.html',
  styleUrls: ['./sec7-saiyaara.component.css']
})
export class Sec7SaiyaaraComponent implements OnInit, OnChanges {
@Input() carByCity:any

  loading = false
  allCarCityArr = []

  constructor(
    private homeService: HomeService,
     private transferDataService: TransferDataService,
     private router:Router
    ) { }
  carByCities
  ngOnInit() {
    this.allCarCityArr = []
    this.loading = true;

    setTimeout(() => {
      if(this.carByCity) {
        this.carByCities = this.carByCity.citys_car_count
        this.loading = false;
      }
    }, 1000);
  }
  
  clickedAllCityCars() {
    for (let i = 0; i < this.carByCities.length; i++) {

      this.allCarCityArr.push(JSON.stringify(this.carByCities[i].id))
      var viewALlCarObj = {
        city_id: this.allCarCityArr,
        }

      this.transferDataService.transferData(viewALlCarObj)
      this.router.navigate(['/used-car','filter'])
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.carByCity) {
      this.carByCities = this.carByCity.citys_car_count
      this.loading = false;
    }
  }
}
