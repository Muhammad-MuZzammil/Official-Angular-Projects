import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealerSingleService } from './../../services/dealer-single.service';
import { dealerImageUrl, imageSize1, imageSize2, imageUrl } from '../../../mainComponents/baseUrl';
import { imageSize, renderingImgFunc } from './../../../mainComponents/baseUrl';
import { PaginationService } from './../../../generalServices/pagination-service/pagination.service';
// import {DealerSingleService} from '../../services/dealer-single.service'

@Component({
  selector: 'featured-inventory',
  templateUrl: './featured-inventory.component.html',
  styleUrls: ['./featured-inventory.component.css']
})
export class FeaturedInventoryComponent implements OnInit, OnChanges {
  generalArr = {'aboutUs': '', 'dealerUsedCars': ''}
  imageSize1 = imageSize1
  imageSize = imageSize
  paginationPageNo = []
  allItems = []
  firstPage = 1
  featureAdsImg
  public dealerImg = dealerImageUrl;
  imageUrl = imageUrl
  imageSize2 = imageSize2
  public lat: Number = 24.935774
  public lng: Number = 67.075091
  public origin: {}
  public destination: {}
  showroomAds: any;
  loading2 = false
  reviews: any;
  firstPrevDisable = true;
  lastNextDisable = true;
  firstPrevDisable2 = true;
  lastNextDisable2 = true;
  startOff = 0
  globalCV = 0
  startOff2 = 0
  globalCV2 = 0
  paginationPageNo2 = [];
  s_review: any;
  userData;
  loading3 = false
  carAds: any;
  userAdObj: any;
  totalRecords: any;
  user_ads: any;
  passTotalPage: any;
  constructor(private dealerSingleService: DealerSingleService,
    private activeRoute: ActivatedRoute, private paginationService: PaginationService) { }
  @Input() directionData: any;
  @Input() showromAds
  generalVarArr = []
  ngOnInit() {
    this.activeRoute.params.subscribe((parameter: any) => {
      this.generalArr['paramsID'] = parameter['id']
    })
    let singleDealerObj = {
      id: this.generalArr['paramsID']
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    
  }
  dealerSingleData(Response) {
    this.generalArr['aboutUs'] = Response.result.about_us
    this.generalArr['dealerUsedCars'] = Response.dealer_used_car.data
    this.featureAdsImg = renderingImgFunc(Response.dealer_used_car.data);
    this.usedCarAdsData(Response)
    // this.showPagination(Response.dealer_used_car.data, Response.dealer_used_car.total)
  }
  mycustfun(page: number, nextPrev, total, currentPage, pageSize, compWisePagination) {
    if (page) {
      this.firstPage = page;
    }
    else if (nextPrev == 'next') {
      this.firstPage = this.generalArr['globalCV'] + 1
    }
    else if (nextPrev == 'prevPage') {
      this.firstPage = this.generalArr['prevPage'] - 1
    }
    let paginationObj = {
      id: this.generalArr['paramsID'],
      pageID: this.firstPage
    }
    this.loading2 = true
    this.generalVarArr['paginateService'] = this.paginationService.postPaginateData(this.firstPage, compWisePagination, paginationObj)
      .subscribe(res => {
        this.generalArr['dealerUsedCars'] = res.dealer_used_car.data
        this.generalArr['globalCV'] = res.dealer_used_car.current_page;
        this.generalArr['prevPage'] = res.dealer_used_car.current_page;
        this.generalArr['nextPage'] = res.dealer_used_car.next_page_url
        this.generalArr['totalRecord'] = res.dealer_used_car.total
        this.generalArr['toPage'] = res.dealer_used_car.to
        this.generalArr['lastPage'] = res.dealer_used_car.last_page
        this.generalArr['fromPage'] = res.dealer_used_car.from
        this.generalArr['perPage'] = res.dealer_used_car.per_page;
        this.setPage(this.allItems[0].current_page, this.allItems[0].total, this.allItems[0].current_page, this.allItems[0].per_page);
        this.loading2 = false
      })
  }
  usedCarAdsData(Response) {
    this.carAds = Response.dealer_used_car.data
    this.userAdObj = Response.dealer_used_car;
    this.loading2 = false;
    this.totalRecords = Response.dealer_used_car.total
    this.user_ads = Response.dealer_used_car
    if(Response.total <= 2){
      this.firstPrevDisable = true
      this.lastNextDisable = true
    }
    else if(Response.dealer_used_car.total > 2 && Response.dealer_used_car.current_page < Response.dealer_used_car.last_page){
      this.lastNextDisable = false
    }
    this.paginationPageNo =  Array(Response.dealer_used_car.last_page).fill(2).map((x,i)=>i)
  }
  showPagination(arr, total) {
    this.paginationPageNo = [];
    for (var i = 1; i <= Math.round((total / arr.length)); i++) {
      this.paginationPageNo.push(i);
    }
  }
  setPage(page: number, total, currentPage, pageSize) {
    this.generalArr['pager'] = this.paginationService.getPager(total, currentPage, pageSize);
    this.generalArr['pagedItems'] = this.allItems.slice(this.generalArr['pager'].startIndex, this.generalArr['pager'].endIndex + 1);
  }
  
  ngOnChanges(simple: SimpleChanges) {
    this.showroomAds = this.showromAds
    if(!this.showroomAds) return;
    this.dealerSingleData(this.showroomAds)
    this.lastNextDisable2 = (this.showroomAds.dealer_used_car.last_page == 1) ? true : false;
  }
  getReviews(sid, page = null, reset = null) {
    if(reset == true){
      this.globalCV = 0;
      this.startOff = 0;
      this.firstPrevDisable = true;
      this.lastNextDisable = true;
    }
    this.loading3 = true;
    this.dealerSingleService.getReviews({showrom_id : sid, page: page}).subscribe(res => {
      this.reviews = res.reviews
      this.paginationPageNo2 =  Array(res.reviews.last_page).fill(2).map((x,i)=>i)
      this.loading3 = false;
      if(res.reviews.total <= 5){
        this.firstPrevDisable = true
        this.lastNextDisable = true
      }
      else if(res.reviews.total > 5 && res.reviews.current_page < res.reviews.last_page){
        this.lastNextDisable = false
      }  
    })
  }
  addReview(sid, uid){
    this.globalCV = 0;
    this.startOff = 0;
    this.firstPrevDisable = true;
    this.lastNextDisable = true;
    this.loading3 = true;
    this.generalVarArr['addReview'] = this.dealerSingleService.addReview({showrom_id : sid, user_id: uid, review: this.s_review.trim()}).subscribe(res => {
      this.s_review  = '';
      this.getReviews(sid);
      this.loading3 = false;
    })
  }
  pagination(curPage){
    this.globalCV = curPage
    this.firstPrevDisable = (curPage == 0) ? true : false;
    this.lastNextDisable = (this.reviews.last_page == curPage+1) ? true : false;
    this.getReviews(this.generalArr['paramsID'], curPage+1);
    this.startOff = curPage
    if(this.reviews.last_page == (curPage+1))
      this.startOff = this.startOff -1
  }
  dealerMoreAds(page = null){
    this.dealerSingleService.getSingleDealer({id: this.generalArr['paramsID'], page: page}).subscribe(res => {
      this.carAds = res.dealer_used_car.data
      this.generalArr['dealerUsedCars'] = res.dealer_used_car.data
      this.userAdObj = res.dealer_used_car;
      this.loading2 = false;
      this.totalRecords = res.dealer_used_car.total
      this.user_ads = res.dealer_used_car
      if(res.total <= 2){
        this.firstPrevDisable = true
        this.lastNextDisable = true
      }
      else if(res.dealer_used_car.total > 2 && res.dealer_used_car.current_page < res.dealer_used_car.last_page){
        this.lastNextDisable = false
      }
    })
  }
  pagination2(curPage){
    this.globalCV2 = curPage
    this.firstPrevDisable2 = (curPage == 0) ? true : false;
    this.lastNextDisable2 = (this.user_ads.last_page == curPage+1) ? true : false;
    this.loading2 = true;
    this.dealerMoreAds(curPage+1);
    this.startOff2 = curPage
    if(this.user_ads.last_page == (curPage+1))
      this.startOff2 = this.startOff2 -1
    
  }
  ngOnDestroy() {
    if (this.generalVarArr['getSingleDealer']) {
      this.generalVarArr['getSingleDealer'].unsubscribe()
    }
    if (this.generalVarArr['paginateService']) {
      this.generalVarArr['paginateService'].unsubscribe()
    }
    if(this.generalVarArr['addReview']){
      this.generalVarArr['addReview'].unsubscribe()
    }
  }
}