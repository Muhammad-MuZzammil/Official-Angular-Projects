import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DealerService } from './../../services/dealer.service';
import { UsedCarService } from './../../../used-carModule/services/used-car.service';
import { PaginationService } from './../../../generalServices/pagination-service/pagination.service';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { CarRateUnder30LacsComponent } from './../../../used-carModule/find-second-hand-car/car-rate-under30-lacs/car-rate-under30-lacs.component';
import { dealerImageUrl, imageSize1 } from '../../../mainComponents/baseUrl';
import { imageSize, mainUrl } from './../../../mainComponents/baseUrl';
// import {TruncatePipe} from '../../../truncate.pipe'
declare var jQuery: any;
declare var google;
@Component({
  selector: 'dealer-showroom-listing',
  templateUrl: './dealer-showroom-listing.component.html',
  styleUrls: ['./dealer-showroom-listing.component.css']
})
export class DealerShowroomListingComponent implements OnInit {

  dealer
  dbFieldS = []
  dealerAdsImage = dealerImageUrl
  APImainURL = mainUrl
  imageSize1 = imageSize1
  imageSize = imageSize
  searchFilterArr = {
    name: "",
    area: "",
    city: [],
    km: "",
  }
  @Output() passTotalRecords = new EventEmitter();
  loading = false
  userRating
  dealerRating
  ratingArr = []
  firstPage = 1
  prevPage
  toPage
  totalRecord
  fromPage
  perPage
  dealerAds = []
  pager
  pagedItems
  generalVarArr = []
  nextPage
  lastPage
  paginationPageNo = []
  isGridOrList = "grid";
  searchByName
  // array of all items to be paged
  public allItems: any[] = [];
  
  popoveruser = "<i class='fa fa-user'></i>";
  popoverbr = "<br>";
  popoverphone = "<i class='fa fa-phone'></i>";
  kmArr = []
  km: any;
  sarea
  firstPrevDisable = true;
  lastNextDisable = false;
  startOff = 0;
  globalCV = 0
  user_ads: any;
  userAdObj: any;
  loading2: boolean;
  totalRecords: any;
  showroms: any;
  constructor(private dealerService: DealerService, private transferDataService: TransferDataService, private fb: FormBuilder, private usedCarService: UsedCarService, private paginationService: PaginationService) {
  }

  ngOnInit() {
    this.initAutocomplete() // google search box
    // window.onload = () => {
    // }
    this.dbFieldS['cityCount'] = 2 // city filter first time show 2 records
    // this.DealersFn() // No 1 priority
    this.dealerFilterSidebar()
    this.loading = true;
    this.filterToggle();
    this.kmArr = Array(50).fill(1).map(n => n)
  }
  filterToggle() {

    jQuery(document).on('click', '.panel-heading a', function () {
      jQuery(this).addClass('active')
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
  DealersFn() {
    this.generalVarArr['getDealersData'] = this.dealerService.getDealersData()
      .subscribe(res => {
        this.loading = false;
        this.dbFieldS['cityName'] = res.citys
        this.dealerAds = res.showroms.data
        this.ratingFn(res.showroms.data)
        this.usedCarAdsData(res)
        // this.showPagination(res.showroms.data, res.showroms.total)
      })
  }

  ratingFn(Response) {
    for (let i = 0; i < Response.length; i++) {
      this.userRating = Math.floor(Response[i].rating)
      Response[i].ratings = this.userRating
      Response[i].ratingArr = [1, 2, 3, 4, 5]
    }
  }

  mycustfun(page: number, nextPrev, total, currentPage, pageSize, compWisePagination) {
    this.loading = true;
    this.onActivate()
    if (page) {
      this.firstPage = page;
    }
    else if (nextPrev == 'next') {
      this.firstPage = this.globalCV + 1
    }
    else if (nextPrev == 'prevPage') {
      this.firstPage = this.prevPage - 1
    }

    if (this.sarea || this.searchByName) {
      let searchObj = {
        address: this.sarea,
        latitude: this.generalVarArr['latitude'],
        longitude: this.generalVarArr['longitude'],
        name: this.searchByName,
        km: this.km
      }
      this.generalVarArr['paginateService'] = this.paginationService.postPaginateData(this.firstPage, compWisePagination, searchObj)
        .subscribe(res => {
          this.ratingFn(res.showroms.data)
          this.globalCV = res.showroms.current_page;
          this.prevPage = res.showroms.current_page;
          this.totalRecord = res.showroms.total
          this.toPage = res.showroms.to
          this.nextPage = res.showroms.next_page_url
          this.fromPage = res.showroms.from
          this.lastPage = res.showroms.last_page
          this.perPage = res.showroms.per_page;
          this.dealerAds = res.showroms.data
          this.loading = false;
          this.setPage(this.allItems[0].current_page, this.allItems[0].total, this.allItems[0].current_page, this.allItems[0].per_page);
        })
    }
    else {
      this.generalVarArr['getPaginateData'] = this.paginationService.getPaginateData(this.firstPage, compWisePagination)
        .subscribe(res => {
          this.dealerAds = res.showroms.data
          this.ratingFn(res.showroms.data)
          this.globalCV = res.showroms.current_page;
          this.prevPage = res.showroms.current_page;
          this.nextPage = res.showroms.next_page_url
          this.totalRecord = res.showroms.total
          this.toPage = res.showroms.to
          this.lastPage = res.showroms.last_page
          this.fromPage = res.showroms.from
          this.perPage = res.showroms.per_page;
          this.loading = false;
          this.setPage(this.allItems[0].current_page, this.allItems[0].total, this.allItems[0].current_page, this.allItems[0].per_page);
        })
    }
  }

  usedCarAdsData(Response) {
    // set items to json response
    this.allItems.push(Response.showroms);
    this.totalRecord = Response.showroms.total
    this.toPage = Response.showroms.to
    this.fromPage = Response.showroms.from
    this.lastPage = Response.showroms.last_page
    this.nextPage = Response.showroms.next_page_url
    this.globalCV = Response.showroms.current_page;
    this.perPage = Response.showroms.per_page;
    this.loading = false;
    // initialize to page 1
    this.setPage(this.allItems[0].current_page, this.allItems[0].total, this.allItems[0].current_page, this.allItems[0].per_page);
    this.dealerAds = Response.showroms.data // car details and list in main body
  }

  setPage(page: number, total, currentPage, pageSize) {
    this.pager = this.paginationService.getPager(total, currentPage, pageSize);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  showPagination(arr, total) {
    this.paginationPageNo = [];
    for (var i = 1; i <= Math.round((total / arr.length)); i++) {
      this.paginationPageNo.push(i);
    }
  }

  initModelForm(): FormGroup {
    return this.fb.group({
      chooseField: new FormArray([]),
    })
  }
  searchByIcon(event, searchBox, searchBy) {
    if (searchBy == 'name') {
      let searchObj = {
        name: (searchBox) ? searchBox : ""
      }
      // this.searchFilterArr.name = searchBox.
      this.dealerFilterSidebar()
    }
    // else if (searchBy == 'area') {
    //   this.sarea = searchBox.value
    //   // this.searchFilterArr.area = searchBox.value
    //   // this.loading = true

    //   // this.GetLatlong(searchBox.value)

    //   // setTimeout(() => {
    //   //   this.loading = false
    //   //   this.dealerFilterSidebar(this.generalVarArr['searchObj'])
    //   // }, 1000);
    // }

  }
  searchByInputField(e, searchBox, searchBy) {
    setTimeout(() => {
      if (searchBy == 'area') {
        this.sarea = searchBox.value
      }
      if (e.keyCode == 13) {
        if (searchBy == 'name') {
          this.searchFilterArr.name = this.searchByName
            let searchObj = {
              name: searchBox
            }
            this.dealerFilterSidebar()
          }
          if (searchBy == 'area') {
            this.sarea = searchBox.value
          }
        }
    }, 400);
  }

  GetLatlong() {
    this.loading = true
    setTimeout(() => {
      var geocoder = new google.maps.Geocoder();
      var address = this.sarea
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.generalVarArr['latitude'] = results[0].geometry.location.lat();
          this.generalVarArr['longitude'] = results[0].geometry.location.lng();
        }
        this.generalVarArr['searchObj'] = {
          address: (address) ? address : '',
          latitude: (this.generalVarArr['latitude']) ? this.generalVarArr['latitude'] : "",
          longitude: (this.generalVarArr['latitude']) ? this.generalVarArr['longitude'] : "",
          km: (this.km) ? this.km : "",
        }
        this.dealerFilterSidebar()
      });
    }, 1000);
  }

  onCheckedEvent(event) {
    this.loading = true;
    const formArray: FormArray = this.initModelForm().get('chooseField') as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));

      for (let i = 0; i < formArray.value.length; i++) {
        if (event.target.id == "cities") {

          this.searchFilterArr.city.push(formArray.value[i])
        }

        this.dealerFilterSidebar();
      }
    } // Selected

    // Unselected
    else {
      formArray.push(new FormControl(event.target.value));
      // find the unselected element
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          if (event.target.id == "cities") {
            if (this.searchFilterArr.city.indexOf(formArray.value[i]) != -1) {
              this.searchFilterArr.city.splice(this.searchFilterArr.city.indexOf(formArray.value[i]), 1)
            }
          }
          this.dealerFilterSidebar();
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    } //Unselected

  } // onCheckedEvent

  dealerFilterSidebar(page = null) {
    if(!page){
      this.globalCV = 0;
      this.startOff = 0
      this.firstPrevDisable = true;
      this.lastNextDisable = false;
    }
    this.loading = true;
    let dealerOb = {} 
    // dealerOb = dealerObj
    dealerOb['address'] = this.sarea
    dealerOb['name'] = this.searchByName
    dealerOb['latitude'] = this.generalVarArr['latitude']
    dealerOb['longitude'] = this.generalVarArr['longitude']
    dealerOb['km'] = this.km
    dealerOb['page'] = page
    this.generalVarArr['postDealersData'] = this.dealerService.postDealersData(dealerOb)
      .subscribe(res => {
        // this.paginationPageNo = []
        // this.totalRecord = res.showroms.total;
        // this.dealerAds = res.showroms.data;
        // this.ratingFn(res.showroms.data)
        // this.nextPage = res.showroms.next_page_url
        // this.passTotalRecords.emit(this.totalRecord)
        // this.toPage = res.showroms.to;
        // this.fromPage = res.showroms.from;
        // this.globalCV = res.showroms.current_page;
        // this.lastPage = res.showroms.last_page
        // this.perPage = res.showroms.per_page;
        // this.loading = false;

        // this.showPagination(this.dealerAds, this.totalRecord)
        this.ratingFn(res.showroms.data)
        
        this.paginationPageNo =  Array(res.showroms.last_page).fill(2).map((x,i)=>i)
        this.dealerAds = res.showroms.data
        this.userAdObj = res;
        this.loading = false;
        this.totalRecords = res.showroms.total
        this.showroms = res.showroms
        this.passTotalRecords.emit(res.showroms.total);
        this.loading2 = true;
        if(res.showroms.total <= 2){
          this.firstPrevDisable = true
          this.lastNextDisable = true
        }
        else if(res.showroms.total > 2 && res.showroms.current_page < res.showroms.last_page){
          this.lastNextDisable = false
        }
      })
    return this.totalRecord;

  }
  onActivate() {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 200);
  }
  list() { // list functionality
    this.isGridOrList = "list";
    jQuery(($) => {
      $("#products .item").addClass("list-group-item");
    })
  }
  grid() { // grid functionality
    this.isGridOrList = "grid";
    jQuery(($) => {
      $("#products .item").removeClass("list-group-item");
      $("#products .item").addClass("grid-group-item");
    })
  }

  showMoreLess(param) {
    if (this.dbFieldS[param] == 2) {
      switch (true) {
        case param == 'cityCount':
          this.dbFieldS[param] = this.dbFieldS['cityName'].length
          break;
      }
    } else {
      this.dbFieldS[param] = 2
    }
    jQuery(($) => {
      var moreClass = this.dbFieldS[param] == 2 ? "more choices..." : " less choices"
      $("." + param).text(moreClass)
    })
  }
  sRating(rating, elem){
    if(!JSON.parse(localStorage.getItem('userData'))) 
      return
    if(JSON.parse(localStorage.getItem('userData')).data.login == 'false') 
      return
    
    jQuery('.ratings i.fa.fa-star#'+elem.target.id).removeClass('ratingStyle')
    jQuery('.ratings i.fa.fa-star#'+elem.target.id).each(function(i){
      if(rating >= (i+1))
        jQuery(this).addClass('ratingStyle')
    });
    this.generalVarArr['ratingSave'] = this.dealerService.ratingSave({showrom_id: elem.target.id.replace('s', ''),rating: rating, user_id: JSON.parse(localStorage.getItem('userData')).data.user_id}).subscribe(res => {})
  }
  ngOnDestroy() {
    if (this.generalVarArr['getDealersData']) {
      this.generalVarArr['getDealersData'].unsubscribe()
    }
    if (this.generalVarArr['paginateService']) {
      this.generalVarArr['paginateService'].unsubscribe()
    }
    if (this.generalVarArr['getPaginateData']) {
      this.generalVarArr['getPaginateData'].unsubscribe()
    }
    if (this.generalVarArr['postDealersData']) {
      this.generalVarArr['postDealersData'].unsubscribe()
    }
    if (this.generalVarArr['ratingSave']) {
      this.generalVarArr['ratingSave'].unsubscribe()
    }
  }

  initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
    var options = {
      componentRestrictions: {country: "pk"}
     };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
    });
  }
  pagination(curPage){
    this.globalCV = curPage
    this.firstPrevDisable = (curPage == 0) ? true : false;
    this.lastNextDisable = (this.showroms.last_page == curPage+1) ? true : false;
    this.dealerFilterSidebar(this.globalCV+1)
    this.startOff = curPage
    if(this.showroms.last_page == (curPage+1))
      this.startOff = this.startOff -1
  }
}