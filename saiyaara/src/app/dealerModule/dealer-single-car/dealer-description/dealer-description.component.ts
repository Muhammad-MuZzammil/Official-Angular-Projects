import { Component, OnInit, Input, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { DealerSingleService } from './../../services/dealer-single.service';
import { ActivatedRoute } from '@angular/router';
import { dealerImageUrl } from '../../../mainComponents/baseUrl';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { mainUrl } from './../../../mainComponents/baseUrl';
@Component({
  selector: 'dealer-description',
  templateUrl: './dealer-description.component.html',
  styleUrls: ['./dealer-description.component.css']
})
export class DealerDescriptionComponent implements OnInit, OnChanges {
  paramsID
  singleDealerData = []
  public dealerImg = dealerImageUrl;
  APImainURL = mainUrl
  generalVarArr=[]
  generalArr = []
  distanceMatrix = []
  modalRef: BsModalRef;
  public loading = false
  @Input() showroomAds
  showromAds
  constructor(private dealerSingleService: DealerSingleService, private modalService: BsModalService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true

    this.activeRoute.params.subscribe((parameter: any) => {
      this.paramsID = +parameter['id']
    })
    let singleDealerObj = {
      id: this.paramsID
    }
    /* this.generalVarArr['getSingleDealer'] = this.dealerSingleService.getSingleDealer(singleDealerObj)
      .subscribe(res => {
        this.loading = false
        this.singleDealerData.push(res.result)
        this.GMData(res)
      }) */
    this.generalArr['origin'] = { lat: 24.829044, lng: 67.086067 }
    let data = {
      origin: this.generalArr['origin'],
    }
    this.distanceMatrix.push(data)
  }
  GMData(Response) {
    this.generalArr['delaerDestination'] = { lat: +Response.result.latitude, lng: +Response.result.longitude }
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  ngOnDestroy() {
    if (this.generalVarArr['getSingleDealer'])
      this.generalVarArr['getSingleDealer'].unsubscribe()
  }
  ngOnChanges(simple: SimpleChanges) {
    this.showromAds = this.showroomAds
    if(!this.showromAds) return;
    this.loading = false
    this.singleDealerData.push(this.showromAds.result)
    this.GMData(this.showromAds)
  }
}
