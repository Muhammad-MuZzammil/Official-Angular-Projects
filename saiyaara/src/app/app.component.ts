import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { HomeService } from './homeModule/services/home.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  generalVarArr=[]
  title = 'app';
  constructor(private homeService: HomeService){
    setTheme('bs3'); // or 'bs4'
  }
  ngOnInit(){
    this.generalVarArr['totalCarCount'] = this.homeService.totalCarCount()
      .subscribe(res => {
          sessionStorage.setItem('total_car_count', res.count)
      })
  }
  saveAdsCountLength(event) {
  }
  ngOnDestroy() {
    if (this.generalVarArr['totalCarCount'])
      this.generalVarArr['totalCarCount'].unsubscribe()
  }
}
