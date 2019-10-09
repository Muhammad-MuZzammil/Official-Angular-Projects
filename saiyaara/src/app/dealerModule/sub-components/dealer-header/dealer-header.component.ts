import { Component, OnInit } from '@angular/core';
import { DealerService } from './../../services/dealer.service';

@Component({
  selector: 'dealer-header',
  templateUrl: './dealer-header.component.html',
  styleUrls: ['./dealer-header.component.css']
})
export class DealerHeaderComponent implements OnInit {
  generalVarArr = {'totalRecords': ''}
  constructor(private dealerService: DealerService) { }

  ngOnInit() {
    this.generalVarArr['getDealersData'] = this.dealerService.getDealersData().subscribe(res => {
      this.generalVarArr['totalRecords'] = res.showroms.total
    })
  }
  receiveTotalRecords(event) {
    this.generalVarArr['totalRecords'] = event
  }
  ngOnDestroy() {
    if (this.generalVarArr['getDealersData'])
      this.generalVarArr['getDealersData'].unsubscribe()
  }
}
