import { Component, OnInit } from '@angular/core';
import { UsedCarService } from './../../services/used-car.service';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';

@Component({
  selector: 'head-section',
  templateUrl: './head-section.component.html',
  styleUrls: ['./head-section.component.css']
})
export class HeadSectionComponent implements OnInit {
  totalPage
  collapseArr = []
  generalObj = {}
  loading = false;

  constructor(
    private usedCarService: UsedCarService,
    private transferDataService: TransferDataService
  ) { }

  ngOnInit() {

  }
  receiveTotalPage(event) {
    this.totalPage = event
  }
  collapseClicked(index) {
    this.loading = true
    let collapseObj = {
      city: index,
    }
    setTimeout(() => {
      this.loading = false
    }, 2000)
    this.transferDataService.transferData(collapseObj)

  }
}
