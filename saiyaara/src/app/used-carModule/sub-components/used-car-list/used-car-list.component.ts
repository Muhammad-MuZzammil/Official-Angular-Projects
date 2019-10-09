import * as moment from 'moment';
import { UsedCarService } from './../../services/used-car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { imageUrl, baseUrl, imageSize, imageSize1, imageSize2 } from './../../../mainComponents/baseUrl';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { renderingImgFunc, NumberWithCommas } from '../../../mainComponents/baseUrl';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { PaginationService } from './../../../generalServices/pagination-service/pagination.service';
import { HomeService } from '../../../homeModule/services/home.service';
declare var jQuery: any;
declare var TweenMax;
declare var MorphSVGPlugin;
declare var TimelineMax;
declare var Power4;
declare var Linear;
@Component({
  selector: 'used-car-list',
  templateUrl: './used-car-list.component.html',
  styleUrls: ['./used-car-list.component.css']
})
export class UsedCarListComponent implements OnInit, OnDestroy {
  selectPriceRange: any;
  selectAssembly: any;
  selectTransmissoin: any;
  selectEngineType: any;
  selectColor: any;
  selectCities: any;
  carNameSearchCount
  selectCarName: any;
  selectCarModel: any;
  selectManuFect: any;
  @Output() passTotalPage: any = new EventEmitter();
  globalCV = 0;
  public loading = false;
  loading2 = false;
  engineSlider
  priceSlider
  mileageSlider
  popoveruser = "<i class='fa fa-user'></i>";
  popoverbr = "<br>";
  popoverphone = "<i class='fa fa-phone'></i>";
  public featureAdsImg
  carAdsImages = imageUrl
  carManufactures
  carCities
  carTransmissions
  carColors
  carEngineTypes
  carAssembly

  is_f_exc: any
  // paged items
  contactNumber // used car ads in user-ads cell number
  next_url // pagination attribute
  totalRecords // pagination attribute
  toPage // pagination attribute
  prevPage // pagination attribute
  fromPage // pagination attribute
  perPage: any // pagination attribute
  paramsID
  manufactured_checked: any
  city_checked
  priceRange // show the value of price max and min slider in priceFilter
  priceFilter // dynamic assign the value in data-slider-value
  ID
  firstPage = 1 // pagination firstPage if no page exist then show firstPage
  is_find_car
  nextPage // nextPage of pagination
  lastPage
  allUsedCarData
  numberWithCommas = NumberWithCommas
  sliderObj = {}
  imageSize1 = imageSize1
  imageSize2 = imageSize2
  imageSize = imageSize
  transferData = {
    manufacture: '',
    car_name_id: '',
    car_search_counter: '',
    model_id: '',
    city: '',
    min_price: '',
    max_price: ''
  };
  // pager object
  pager: any = {};
  generalVarArr: any = [0] // general Array
  carAds = []
  // array of all items to be paged
  carStocksArr = []
  public allItems: any[] = [];
  pagedItems: any[];
  paginationPageNo = []
  searchFilterArr = {
    manufacture_id: [],
    city_id: [],
    colors: [],
    engine_type: [],
    assembly: [],
    tranmissoin: [],
    price: [],
    mileage: [],
    engine: [],
  };
  minValS
  maxValS
  userData: any;
  isGridOrList = "grid"
  minMValS: number;
  maxMValS: number;
  user_ads: any;
  adsAuthor: any;
  userAdObj
  carBodyTypes: any;
  carNameShow = false
  carnames: any;
  carModelShow = false;
  carmodels
  carAttrLoad1 = false;
  carAttrLoad2 = false;
  adCarCities
  nearly_new: any;
  manuCarNameTouch = false;
  carUnregisteredCount: any;
  filterData: { 'manufacture': any[]; 'car_name': any[]; 'car_model': any[]; 'ad_city': any[]; 'reg_city': any[]; 'price': any; 'color': any[]; 'transmission': any[]; 'engine_type': any[]; 'saiyaara_certified': any; 'assembly': any[]; 'mileage': any; 'engine_capacity': any; 'body_type': any[]; 'Unregistered_city': any[]; 'page': any; 'nearly_new': any[]; 'car_name_id': any; 'car_search_counter': any; 'user_id': any; 'condition_variable': any; };
  startOff = 0;
  qp: any;
  constructor(private paginationService: PaginationService, private transferDataService: TransferDataService, private activeRoute: ActivatedRoute, private usedCarService: UsedCarService, private fb: FormBuilder, private router: Router, private homeSer: HomeService) { }
  username = new FormControl(null, [Validators.required]);
  cell_number = new FormControl(null, [Validators.required]);
  offer = new FormControl(null, [Validators.required]);

  inspectionForm: FormGroup = this.fb.group({
    username: this.username,
    cell_number: this.cell_number,
    offer: this.offer
  });
  saveAdsID
  subscription: any;
  allFields
  isFilterNull = false
  firstPrevDisable = true;
  lastNextDisable = false;
  c_s
  m_s
  uSaveAdsID = []
  ngOnInit() {
    this.loadingSvg();
    this.saveAdsID = JSON.parse(localStorage.getItem("heartObj"))
    this.is_f_exc = false
    this.filterToggle()
    this.onActivate() //scrolltop

    this.generalVarArr['carCount'] = 2 // initial value of make filter data
    this.generalVarArr['cityCount'] = 2 // initial value of city filter data
    this.generalVarArr['colorCount'] = 2 // initial value of color filter data
    this.generalVarArr['bodyTypeCount'] = 2 // initial value of color filter data
    if(localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData'))
      if(this.userData) {
        if(this.userData.data.login == 'true') {
          this.uSaveAdsID = JSON.parse(localStorage.getItem("uHeartObj"))
        }
      }
    }
    this.makeSlider();
    this.router.events.subscribe((event) => {
      setTimeout(() => {
        if(localStorage.getItem('userData')) {
          this.userData = JSON.parse(localStorage.getItem('userData'))
          if(this.userData) {
            if(this.userData.data.login == 'true'){
              this.uSaveAdsID = JSON.parse(localStorage.getItem("uHeartObj"))
            }
          }
        }
      }, 1000);
    });
    this.activeRoute.queryParams.subscribe((params) => {
      this.qp = params;
      this.allFields = {'user_id': '', 'condition_variable': ''};
      setTimeout(() => {
        this.allFields = Object.assign(this.allFields, params); 
        this.getCarNameAndCarModel('manu', this.allFields.manufacture)
        this.getCarNameAndCarModel('carname', this.allFields.car_name)
        this.nearly_new = params['nearly_new']
        this.closedFilterTabs(this.allFields);
        if(Object.keys(params).length == 0){
          this.globalCV = 0
          this.startOff = 0
          this.firstPrevDisable = true;
        }
        this.transferDataService.transferQueryParams(params)
      }, 500)
      setTimeout(() => {
        this.filterData = this.valConvert(this.allFields);
        this.usedCarAdsData(this.filterData)
        if(this.allFields.price)
        {
          jQuery('#price').slider({ 'value': [parseInt(this.allFields.price.split(',')[0]), parseInt(this.allFields.price.split(',')[1] || 100000000)] });
          jQuery('#price').slider('refresh');
          this.minValS = this.allFields.price.split(',')[0];
          this.maxValS = this.allFields.price.split(',')[1];
        }
      }, 1000)
    });
    this.activeRoute.params.subscribe((parameter: any) => {
      this.allFields['user_id'] = parameter['id'] || '';
      this.adsAuthor = parameter['id'] 
    })
    this.loading = true;
  }
  filterToggle() {
      jQuery('.toggle-panel').click(function(e){
      e.preventDefault();
      var target = jQuery(this).attr('href');
      var cur = this;
      if(jQuery(cur).find('i').hasClass('fa-caret-right')){
        jQuery(cur).find('i').removeClass('fa-caret-right')
        jQuery(cur).find('i').addClass('fa-caret-down')
        jQuery(target).addClass('panel-show')
      }
      else{
        jQuery(cur).find('i').removeClass('fa-caret-down')
        jQuery(cur).find('i').addClass('fa-caret-right')
        jQuery(target).removeClass('panel-show')
      }
     
    })
    setTimeout(() => {
      jQuery('.panel-collapse').each(function () {
        var curElem = this
        if (jQuery(curElem).is(':visible')) {
          jQuery('a[href="#' + jQuery(curElem).attr('id') + '"]').addClass('active')
        }
      })
    }, 900);
  }
  makeSlider(){
    this.rangeSlider("#price", this.priceFilter, 'price_from', 'price_to', this.allUsedCarData)
    this.rangeSlider("#mileage", this.mileageSlider, 'mileage_from', 'mileage_to', this.allUsedCarData)
    this.rangeSlider("#ex2", this.engineSlider, 'engine_from', 'engine_to', this.allUsedCarData)
  }

  initModelForm(): FormGroup {
    return this.fb.group({
      myChoices: new FormArray([]),
    })
  }
  usedCarAdsData(args) {
    this.loading = true;
    this.generalVarArr['usedCarAds'] = this.usedCarService.usedCarAds(args, args.page)
      .subscribe(res => {
        this.carAds = res.user_ads.data
        this.userAdObj = res;
        this.loading = false;
        this.totalRecords = res.user_ads.total
        this.user_ads = res.user_ads
        this.passTotalPage.emit(res.user_ads.total);
        this.loading2 = true;
        if(res.user_ads.total <= 6){
          this.firstPrevDisable = true
          this.lastNextDisable = true
        }
        else if(res.user_ads.total > 6 && res.user_ads.current_page < res.user_ads.last_page){
          this.lastNextDisable = false
        }
        this.onActivate2()
        this.paginationPageNo =  Array(res.user_ads.last_page).fill(2).map((x,i)=>i)
        if(this.isFilterNull) return;
        this.carManufactures = res.manufactures
        this.carCities = res.reg_citys
        this.adCarCities = res.ad_citys
        this.carColors = res.colors
        this.carEngineTypes = res.engine_type
        this.carAssembly = res.assembly
        this.carTransmissions = res.tranmissoin
        this.carBodyTypes = res.body_types;
        this.carUnregisteredCount = res.Unregistered_city_count[0].count
        this.isFilterNull = true
      })
  }

  ContactSellerFunc(event, index, number_counter) {
    let contactSellerObj = {
      id: index,
      number_counter: number_counter
    }
    this.generalVarArr['postCellNumber'] = this.usedCarService.postCellNumber(contactSellerObj)
      .subscribe(res => {
    })
  }
  heartClicked(recordID, index) {
   
    if (this.userData.data.login === 'true') {
      //check if user is login
      let heartObj = {
        user_id: this.userData.data.user_id,
        ad_id: recordID
      }
      this.generalVarArr['saveAds1'] = this.usedCarService.saveAds(heartObj)
        .subscribe(res => {
          if (res.msg === "ad saved successfully") {
            this.showSaveAd()
            this.generalVarArr['saveAdsActive'] = true
            this.uSaveAdsID.push(recordID)
          }
          else {
            this.hideSaveAd()
            this.generalVarArr['saveAdsActive'] = false
            this.uSaveAdsID.splice(this.uSaveAdsID.indexOf(recordID), 1)
          }
          this.transferDataService.transfersaveAdData(this.uSaveAdsID.length)
          localStorage.setItem("uHeartObj", JSON.stringify(this.uSaveAdsID))
        })
        
      }
      else {
        this.saveAdsID = JSON.parse(localStorage.getItem("heartObj")) || []
        if (this.saveAdsID.indexOf(recordID) == -1) {
          this.saveAdsID.push(recordID)
          this.showSaveAd()
          this.generalVarArr['saveAdsActive'] = true
        }
        else {
          this.saveAdsID.splice(this.saveAdsID.indexOf(recordID), 1)
          this.hideSaveAd()
          if (this.saveAdsID[this.saveAdsID.indexOf(recordID)] !== recordID) {
            this.generalVarArr['saveAdsActive'] = false
          }
        }
        this.transferDataService.transfersaveAdData(this.saveAdsID.length)
        localStorage.setItem("heartObj", JSON.stringify(this.saveAdsID))
      }
  }
  showSaveAd() {
    this.generalVarArr['saveAdShow'] = true
    setTimeout(() => {
      this.generalVarArr['saveAdShow'] = false
    }, 2000);
  }
  hideSaveAd() {
    this.generalVarArr['saveAdHide'] = true
    setTimeout(() => {
      this.generalVarArr['saveAdHide'] = false
    }, 2000);
  }
  onActivate() {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 200);
  }
  onActivate2() {
    jQuery('html, body').animate({
      scrollTop: 302.3999938964844
    }, 500);

  }
  showMoreLess(param) {
    if (this.generalVarArr[param] == 2) {
      switch (true) {
        case param == 'cityCount':
          this.generalVarArr[param] = this.carCities.length
          break;
        case param == 'carCount':
          this.generalVarArr[param] = this.carManufactures.length
          break;
        case param == 'colorCount':
          this.generalVarArr[param] = this.carColors.length
          break;
        case param == 'adCityCount':
          this.generalVarArr[param] = this.carCities.length
          break;
        case param == 'bodyTypeCount':
          this.generalVarArr[param] = this.userAdObj.body_types.length
          break;    
      }
    } else {
      this.generalVarArr[param] = 2
    }
    jQuery(($) => {
      var moreClass = this.generalVarArr[param] == 2 ? "more choices..." : " less choices"
      $("." + param).text(moreClass)
    })

  }
  updateTime(date) {
    return moment(date).fromNow()
  }
  list() { // list functionality
    this.isGridOrList = "list"
    jQuery(($) => {
      $("#products .item").addClass("list-group-item");
    })
  }
  grid() { // grid functionality
    this.isGridOrList = "grid"
    jQuery(($) => {
      $("#products .item").removeClass("list-group-item");
      $("#products .item").addClass("grid-group-item");
    })
  }
  closedFilterTabs(tabID) {
    jQuery("a[href='#collapse102'").click()
    if (tabID.color)
      jQuery("a[href='#collapse8'").click()
    if (tabID.transmission)
      jQuery("a[href='#collapse4'").click()
    if (tabID.engine_type)
      jQuery("a[href='#collapse5'").click()
    if (tabID.assembly)
      jQuery("a[href='#collapse6'").click()
    if (tabID.price)
      jQuery("a[href='#collapse12'").click()
    if (tabID.reg_city)
      jQuery("a[href='#collapse3'").click()
    if (tabID.ad_city)
      jQuery("a[href='#collapse11'").click()  
  }
  saveAdsInit() {
    this.generalVarArr['saveAdCount'] = 1
    this.generalVarArr['saveAdShow'] = false
    this.generalVarArr['saveAdHide'] = false

    if (this.generalVarArr['saveAdCount'] == 1) {
      let retrievedObj = JSON.parse(localStorage.getItem("heartObj"))
      if (retrievedObj === null) {
      }
      else {
        this.generalVarArr['saveAds2'] = this.usedCarService.saveAds(retrievedObj)
          .subscribe(res => {
          })
      }
    }
  }
  adFilter(page = null){
    this.loading = true;
    setTimeout(() => {
      var object = {};
      let formData ;
      formData = new FormData(document.querySelector('#adFilter'))
      formData.forEach(function(value, key){
        if(value) object[key] = value;
      });
      object['page'] = page;
      if(!page){
        this.globalCV = 0;
        this.startOff = 0
        this.firstPrevDisable = true;
        this.lastNextDisable = false;
      }
      this.filterData = this.valConvert(object);
      if(this.allFields['user_id']) this.filterData.user_id = this.allFields['user_id'];
      this.usedCarAdsData(this.filterData)
    }, 700);
  }
  getCarNameAndCarModel(identity, id){
    if(identity == 'manu' && id){
      this.carNameShow = true
      this.carModelShow = false
      jQuery('input[name=car_name]').prop('checked', false)
      jQuery('.car_model').prop('checked', false)
      jQuery('.kv-panel.reset-scroll-c').animate({scrollTop: 0},1);
      this.carAttrLoad1 = true;
      this.generalVarArr['carManufectData2'] =  this.homeSer.carManufectData2({'id': id}).subscribe(res => {
        let result
        result = res
        this.carnames = result.manufacture_rec
        this.carAttrLoad1 = false;
        jQuery('#collapse103').addClass('panel-show')
        jQuery('a[href="#collapse103"]').find('i').addClass('fa-caret-down')
        jQuery('a[href="#collapse103"]').find('i').removeClass('fa-caret-right')
        
      })
    }
    else if(identity == 'carname' && id){
      this.carModelShow = true
      this.carAttrLoad2 = true;
      jQuery('.car_model').prop('checked', false)
      jQuery('.kv-panel.reset-scroll-m').animate({scrollTop: 0},1);
      this.generalVarArr['carName2'] =  this.homeSer.carName2({'id': id}).subscribe(res => {
        let result
        result = res
        this.carmodels = result.car_name_rec
        this.carAttrLoad2 = false;
        jQuery('#collapse104').addClass('panel-show')
        jQuery('a[href="#collapse104"]').find('i').addClass('fa-caret-down')
        jQuery('a[href="#collapse104"]').find('i').removeClass('fa-caret-right')
      })
    }
  }
  valConvert(filterVal) {
    let obj = {'manufacture': [], 'car_name': [], 'car_model': [], 'ad_city': [],
               'reg_city': [], 'price': null, 'color': [], 'transmission': [],
               'engine_type': [], 'saiyaara_certified': null, 'assembly': [],
               'mileage': null, 'engine_capacity': null, 'body_type': [], 'Unregistered_city': [],
              'page': null, 'nearly_new': [], 'car_name_id': null, 'car_search_counter': null,
              'user_id': null, 'condition_variable': null}
    for(let f in filterVal) {
      if(f.indexOf('manufacture') != -1)
        obj['manufacture'].push(filterVal[f])
      if(f == 'car_name')
        obj['car_name'].push(filterVal[f])
      if(f.indexOf('car_model') != -1)
        obj['car_model'].push(filterVal[f])
      if(f.indexOf('ad_city') != -1)
        obj['ad_city'].push(filterVal[f])
      if(f.indexOf('reg_city') != -1)
        obj['reg_city'].push(filterVal[f])
      if(f.indexOf('price') != -1)
        obj['price'] = filterVal[f]
      if(f.indexOf('price1') != -1)
        obj['price'] = filterVal[f]
      if(f.indexOf('price2') != -1)
        obj['price'] += ","+filterVal[f]
      if(f.indexOf('color') != -1)
        obj['color'].push(filterVal[f])
      if(f.indexOf('transmission') != -1)
        obj['transmission'].push(filterVal[f])
      if(f.indexOf('engine_type') != -1)
        obj['engine_type'].push(filterVal[f])
      if(f.indexOf('saiyaara_certified') != -1)
        obj['saiyaara_certified'] = filterVal[f]
      if(f.indexOf('assembly') != -1)
        obj['assembly'].push(filterVal[f])
      if(f.indexOf('mileage') != -1)
        obj['mileage'] = filterVal[f]
      if(f.indexOf('engine_capacity') != -1)
        obj['engine_capacity'] = filterVal[f]
      if(f.indexOf('body_type') != -1)
        obj['body_type'].push(filterVal[f])
      if(f.indexOf('Unregistered_city') != -1)
        obj['Unregistered_city'].push(filterVal[f])
      if(f.indexOf('page') != -1)
        obj['page'] = filterVal[f]  
      if(f.indexOf('nearly_new') != -1)
        obj['nearly_new'].push(filterVal[f]) 
      if(f == 'car_name_id')
        obj['car_name_id'] = filterVal[f]  
      if(f == 'car_search_counter')
        obj['car_search_counter'] = filterVal[f]  
      if(f == 'user_id')
        obj['user_id'] = filterVal[f]
      if(f == 'condition_variable' && filterVal[f] != 0)
        obj['condition_variable'] = filterVal[f]       
    }
    return obj
  }
  minMaxPriceError
  minMaxValS(identity) {
    this.minValS = this.minValS || 0;
    this.maxValS = this.maxValS || 100000000;
    let min = this.minValS;
    let max = this.maxValS;
    let maxf = 100000000
    let milObj
    if (min <= max)
      maxf = 100000000

    if (identity == 'maxValS') {
      this.minMaxPriceError = ""
      if (min >= max) {
        this.minMaxPriceError = "Maximum price must be greater than Minimum price!";
        jQuery('#price').slider({ 'value': [parseInt(min), 100000000] });
      }
      else {
        jQuery('#price').slider({ 'value': [parseInt(min), parseInt(max)] });
        jQuery('#price').slider('refresh');
        this.adFilter()
      }
    }
  }
  minMaxMPriceError
  minMaxMValS(identity) {
    this.minMValS = this.minMValS || 0;
    this.maxMValS = this.maxMValS || 1000000;
    let min = this.minMValS;
    let max = this.maxMValS;
    let maxf = 1000000
    let milObj
    if (min <= max)
      maxf = 1000000
    if (identity == 'maxMValS') {
      this.minMaxMPriceError = ""
      if (min >= max) {
        this.minMaxMPriceError = "Maximum mileage must be greater than Minimum mileage!";
        jQuery('#mileage').slider({ 'value': [min, 1000000] });
      }
      else {
        jQuery('#mileage').slider({ 'value': [min, max] });
        jQuery('#mileage').slider('refresh');
        this.adFilter()
      }
    }
  }
  rangeSlider(id, sliderObj, from, to, Response) {
      setTimeout(() => {
        if(this.allFields.price) {
          let price = ""
          price = this.allFields.price
          if(this.allFields.price.indexOf(',') == -1)
            price = this.allFields.price+','+'100000000';
          price = "["+price+"]"
          $('#price').attr('data-slider-value', price);
          this.minValS = price.split(',')[0]
          this.maxValS = price.split(',')[1]
        }
        }, 550);
        jQuery(id).slider({
          range: false,
          step: (id == '#price') ? 50000 : 1,
        }).on('slideStop', (sliderValue) => {
            if(id == '#price'){
              this.minValS = sliderValue.value[0]
              this.maxValS = sliderValue.value[1]
            }
            else if(id == '#mileage'){
              this.minMValS = sliderValue.value[0]
              this.maxMValS = sliderValue.value[1]
            }
            this.adFilter();
          });
}
  ngOnDestroy() {
    if(this.generalVarArr['usedCarAds'])
    this.generalVarArr['usedCarAds'].unsubscribe()
    if(this.generalVarArr['carName2'])
    this.generalVarArr['carName2'].unsubscribe()
    if(this.generalVarArr['carManufectData2'])
    this.generalVarArr['carManufectData2'].unsubscribe()
    if (this.generalVarArr['transferDataService'])
      this.generalVarArr['transferDataService'].unsubscribe()
    if (this.generalVarArr['specificUserCar'])
      this.generalVarArr['specificUserCar'].unsubscribe()
    if (this.generalVarArr['sidebarData1'])
      this.generalVarArr['sidebarData1'].unsubscribe()
    if (this.generalVarArr['usedCarAds'])
      this.generalVarArr['usedCarAds'].unsubscribe()
    if (this.generalVarArr['postPaginateData1'])
      this.generalVarArr['postPaginateData1'].unsubscribe()
    if (this.generalVarArr['postPaginateData2'])
      this.generalVarArr['postPaginateData2'].unsubscribe()
    if (this.generalVarArr['postPaginateData3'])
      this.generalVarArr['postPaginateData3'].unsubscribe()
    if (this.generalVarArr['postPaginateData4'])
      this.generalVarArr['postPaginateData4'].unsubscribe()
    if (this.generalVarArr['postPaginateData5'])
      this.generalVarArr['postPaginateData5'].unsubscribe()
    if (this.generalVarArr['getPaginateData'])
      this.generalVarArr['getPaginateData'].unsubscribe()
    if (this.generalVarArr['sidebarData2'])
      this.generalVarArr['sidebarData2'].unsubscribe()
    if (this.generalVarArr['postCellNumber'])
      this.generalVarArr['postCellNumber'].unsubscribe()
    if (this.generalVarArr['saveAds1'])
      this.generalVarArr['saveAds1'].unsubscribe()
    if (this.generalVarArr['saveAds2'])
      this.generalVarArr['saveAds2'].unsubscribe()
  }
  pagination(curPage){
    this.globalCV = curPage
    this.firstPrevDisable = (curPage == 0) ? true : false;
    this.lastNextDisable = (this.user_ads.last_page == curPage+1) ? true : false;
    this.adFilter(curPage+1);
    this.startOff = curPage
    if(this.user_ads.last_page == (curPage+1))
      this.startOff = this.startOff -1
     
  }
  resetFilter(type){
    if(type == 'all'){
      jQuery('#adFilter')[0].reset();
      jQuery('#mileage').slider('setValue', [0, 1000000] );
      jQuery('#price').slider('setValue', [0, 100000000] );
      jQuery('#ex2').slider('setValue', [0, 5000] );
      this.carNameShow = false;
      this.carModelShow = false;
    }
    else if(type == 'manufacture'){
      this.carNameShow = false;
      this.carModelShow = false;
      jQuery('input[name^="car_name"]').prop('checked', false);
      jQuery('input[name^="car_model"]').prop('checked', false);
    }
    else if(type == 'car_name'){
      this.carModelShow = false;
      jQuery('input[name^="car_name"]').prop('checked', false);
      jQuery('input[name^="car_model"]').prop('checked', false);
    }
    else if(type == 'engine_capacity'){
      jQuery('#ex2').slider('setValue', [0, 5000] );
    }
    else if(type == 'price'){
      jQuery('#price').slider('setValue', [0, 100000000] );
      jQuery('input[name="minnValS"]').val('');
      jQuery('input[name="maxnValS"]').val('');
    }
    else if(type == 'mileage'){
      jQuery('#mileage').slider('setValue', [0, 1000000] );
      jQuery('input[name="minMnValS"]').val('');
      jQuery('input[name="maxMnValS"]').val('');
    }
    jQuery('input[name^="'+type+'"]').prop('checked', false);
    this.adFilter();
  }
  loadingSvg(){
    TweenMax.set('#circlePath', {
      attr: {
        r: document.querySelector('#mainCircle').getAttribute('r')
      }
    })
    MorphSVGPlugin.convertToPath('#circlePath');
    var xmlns = "http://www.w3.org/2000/svg",
      xlinkns = "http://www.w3.org/1999/xlink",
      select = function(s) {
        return document.querySelector(s);
      },
      selectAll = function(s) {
        return document.querySelectorAll(s);
      },
      mainCircle = select('#mainCircle'),
      mainContainer = select('#mainContainer'),
      car = select('#car'),
      mainSVG = select('.mainSVG'),
      mainCircleRadius = Number(mainCircle.getAttribute('r')),
      numDots = mainCircleRadius / 2,
      step = 360 / numDots,
      dotMin = 0,
      circlePath = select('#circlePath')
    TweenMax.set('svg', {
      visibility: 'visible'
    })
    TweenMax.set([car], {
      transformOrigin: '50% 50%'
    })
    TweenMax.set('#carRot', {
      transformOrigin: '0% 0%',
      rotation:30
    })
    var circleBezier = MorphSVGPlugin.pathDataToBezier(circlePath.getAttribute('d'), {
      offsetX: -20,
      offsetY: -5
    })
    var mainTl = new TimelineMax();
    function makeDots() {
      var d, angle, tl;
      for (var i = 0; i < numDots; i++) {
        d = select('#puff').cloneNode(true);
        mainContainer.appendChild(d);
        angle = step * i;
        TweenMax.set(d, {
          x: (Math.cos(angle * Math.PI / 180) * mainCircleRadius) + 400,
          y: (Math.sin(angle * Math.PI / 180) * mainCircleRadius) + 300,
          rotation: Math.random() * 360,
          transformOrigin: '50% 50%'
        })
        tl = new TimelineMax({
          repeat: -1
        });
        tl
          .from(d, 0.2, {
            scale: 0,
            ease: Power4.easeIn
          })
          .to(d, 1.8, {
            scale: Math.random() + 2,
            alpha: 0,
            ease: Power4.easeOut
          })
        mainTl.add(tl, i / (numDots / tl.duration()))
      }
      var carTl = new TimelineMax({
        repeat: -1
      });
      carTl.to(car, tl.duration(), {
        bezier: {
          type: "cubic",
          values: circleBezier,
          autoRotate: true
        },
        ease: Linear.easeNone
      })
      mainTl.add(carTl, 0.05)
    }
    makeDots();
    mainTl.time(120);
    TweenMax.to(mainContainer, 20, {
      rotation: -360,
      svgOrigin: '400 300',
      repeat: -1,
      ease: Linear.easeNone
    });
    mainTl.timeScale(1.1)
  }
}
