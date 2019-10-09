import { baseUrl, imageUrl, renderingImgFunc, NumberWithCommas, imageSize, imageSize1, carFeaturesImg, imageSize3 } from './../../../mainComponents/baseUrl';
import { UsedCarSingleService } from './../services/used-car-single.service';
import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsedCarListComponent } from './../../sub-components/used-car-list/used-car-list.component';
import { UsedCarService } from './../../services/used-car.service';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { Meta } from '@angular/platform-browser';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
import { IfStmt } from '../../../../../node_modules/@angular/compiler';
declare var jQuery: any;
declare var TweenMax;
declare var MorphSVGPlugin;
declare var TimelineMax;
declare var Power4;
declare var Linear;
@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  
  // @Output() clickedPrintAd = new EventEmitter<MouseEvent>();
  @Input() url = location.href;
  @Input() text = '';
  @ViewChild('element') element: any;
  nameRequired = "Please Enter your Name"
  phoneRequired = "Please Enter your Cell Number"
  cellNumberMax = "Cell Number exactly 11 digits"
  offerRequired = "Please Enter your Offer Price"
  heartAdsArr = []
  wholeDataSingleCar;
  loading = false
  generalFields:any = {}
  paramsID: number; // parameter ID
  userRole;
  carRatingNum = [] // rating stars Array
  carRating
  carDetailsArr = [];
  recentViewData = []
  generalVarArr: any = {}
  relatedCars // related cars section
  dealerCars //dealer cars section
  carDetailsParts
  imageSize3 = imageSize3
  carStock
  userID
  CarsImagesUrl = imageUrl
  carFeatureImg = carFeaturesImg
  munufID
  car_nameID
  modelID
  cellNumber
  id
  cityID
  makeOfferSuccess = false
  offerSuccess = false
  offerFailure = false;
  public carAdsImg
  buyerMsgs
  imageSize1 = imageSize1
  imageSize = imageSize
  numberWithCommas = NumberWithCommas
  singleSaveAd = true
  shareUrl
  minOffer
  userData: any;
  saveAdsID = []
  similarCar: any;
  
  constructor(
    private usedCarService: UsedCarService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private transferDataService: TransferDataService,
    private singleCarService: UsedCarSingleService,
    private meta: Meta,
    private router: Router
  ) {
    jQuery(($) => {
      $.fancybox.defaults.thumbs.autoStart = true;
    });
  }
  offerMin
  singleCarData(singleObj) {
    this.loading = true
    this.recentViewData['data'] = []
    
    this.generalVarArr['usedCarSingle'] = this.singleCarService.usedCarSingle(singleObj)
      .subscribe(res => {
        this.loading = false
        this.recentViewData['data'] = res
        this.minOffer = parseInt(res.car_detail[0].min_amount)
        this.offerMin = "Please enter atleast "
        this.wholeDataSingleCar = res
        this.similarCar = res.sell_similar_car || "/used-car-single/"+res.car_detail[0].id
        this.shareUrl = encodeURIComponent(document.URL);
        this.carStock = res.car_stock
        // setTimeout(() => {
          this.carRatingFn(res)
          this.carDetails(res)
          this.relatedCar(res)
          this.dealerCar(res)
        // }, 1000);
        let $this = this;
        setTimeout(() => {
          jQuery("#myCarousel_").carousel({
            interval: false,
          });
          jQuery("#custom_carousel").carousel({
            interval: false,
          });
          jQuery("#myCarousel_").on('slide.bs.carousel', function (event) {
            var to = $(event.relatedTarget).index();
            to = to / 2;
            jQuery('.image-gallery  .gl-img').removeClass('active')
            jQuery('.image-gallery  .gl-img[data-slide-to="'+to+'"] ').addClass('active')
          });
          jQuery("#custom_carousel").on('slide.bs.carousel', function (event) {
            var to = $(event.relatedTarget).index();
            jQuery('.gal-thumb .nav li').removeClass('active')
            jQuery('.gal-thumb .nav li[data-slide-to="'+to+'"] ').addClass('active')
          });
          jQuery('.car-loading').fadeOut();
        }, 1000);
        jQuery(document).on('click', "#myCarousel_  .item a", function () {
          ;
          jQuery("#custom_carousel").carousel(parseInt($(this).attr('index')));
        })
        
        
      })
  }
  username = new FormControl(null, Validators.required);
  cell_number = new FormControl(null, [Validators.required, Validators.pattern('[0-9]{11}')]);
  offer = new FormControl(null, [Validators.required, (control: AbstractControl) => Validators.min(this.minOffer)(control)])
  offerForm: FormGroup = this.fb.group({
    username: this.username,
    cell_number: this.cell_number,
    offer: this.offer
  });
  spamRadio
  
  ngOnInit() {
    jQuery('.car-loading').show();
    this.loadingSvg()
    this.dropdownActive()
    this.userData = JSON.parse(localStorage.getItem('userData'))
    if(this.userData){
      if(this.userData.data.login == 'true'){
        this.saveAdsID = JSON.parse(localStorage.getItem("uHeartObj"))
      }
    }
    this.router.events.subscribe((event) => {
      setTimeout(() => {
        this.userData = JSON.parse(localStorage.getItem('userData'))
        if(this.userData){
          if(this.userData.data.login == 'true'){
            this.saveAdsID = JSON.parse(localStorage.getItem("uHeartObj"))
          }
        }
      }, 1000);
    });
    this.activeRoute.params.subscribe((parameter: any) => {
      jQuery('.car-loading').show();
      this.paramsID = +parameter['id']
      this.isLoggedIn()
      this.activeSaveAd() // active save ads class
      this.saveParamsIDLS()
      let carObj = {
        id: this.paramsID,
        recent_viewed_ad: localStorage.getItem('Response')
      }
      this.singleCarData(carObj)
      this.onActivate()
    })
    this.saveParamsIDLS()

  }
  isLoggedIn(): any {
    this.generalFields['userData'] = JSON.parse(localStorage.getItem('userData'))
  }
  dropdownActive(){
    jQuery(() => {
      var btnContainer = document.getElementById("car_gl");
      if(btnContainer){
        var btns = btnContainer.getElementsByClassName("gl-img");
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
          });
        }
      }
    })
  }
  saveParamsIDLS() {
    var carAdsInCache = []
    if (localStorage.getItem('Response'))
      carAdsInCache = JSON.parse(localStorage.getItem('Response'));
    carAdsInCache.unshift(this.paramsID);
    carAdsInCache = carAdsInCache.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
    let fads = []
    for (let i = 0; i <= 4; i++) {
      if (carAdsInCache[i] != undefined)
        fads[i] = carAdsInCache[i];
    }
    localStorage.setItem('Response', JSON.stringify(fads));
  }

  clickedSpecificCar(index) {
    let carObj = {
      id: index,
      recent_viewed_ad: localStorage.getItem('Response')
    }
    this.singleCarData(carObj)
    this.onActivate()
  }
  viewCounter(index, viewAdd) {
    let viewCounterObj = {
      car_id: index,
      views: viewAdd
    }
    this.generalVarArr['collapseAPI'] = this.usedCarService.collapseAPI(viewCounterObj)
      .subscribe(res => {
      })
  }
  carRatingFn(Response) {
    for (let i = 0; i < Response.car_detail.length; i++) {
      this.carRating = +Response.car_detail[i].rating
      if (this.carRating != null) {
        Response.car_detail[i].ratingInNum = this.carRating
        Response.car_detail[i].ratingArr = [1, 2, 3, 4, 5]
      }
    }
  }
  carFKeys = []
  carDetails(Response) {
    this.carDetailsArr = Response.car_detail;
    this.cellNumber = this.carDetailsArr[0].cell_number,
    this.generalFields['adUserID'] = this.carDetailsArr[0].user_id
    this.userRole = this.carDetailsArr[0].user_role
    this.carDetailsParts = this.carDetailsArr[0].car_features
    this.viewCounter(this.paramsID, this.carDetailsArr[0].views)
    if(this.carDetailsParts)
    {
      for (let i = 0; i < this.carDetailsParts.length; i++) {
        this.carFKeys[i] = Object.keys(this.carDetailsParts[i])[0]
      }
      this.carFKeys = this.carFKeys.filter(n => n)
    }
  }
  relatedCar(Response) {
    this.relatedCars = Response.related_car
    this.carAdsImg = renderingImgFunc(this.relatedCars);
  }

  dealerCar(Response) {
    this.dealerCars = Response.dealer_related_car
    this.carAdsImg = renderingImgFunc(this.dealerCars);
  }
  showNumber(event, index, number_counter = null)  {
    jQuery(($) => {
      $("." + event).text(this.cellNumber)
    })
    let contactSellerObj = {
      id: index,
      number_counter: number_counter
    }
    this.generalVarArr['postCellNumber'] = this.usedCarService.postCellNumber(contactSellerObj)
      .subscribe(res => {
      })
  }
  buyerMsg() {
    jQuery(($) => {
      if (this.generalFields['userData'].data.login === 'true') {

        $(".buyerMsg").toggle(200);
      }
      else {
        this.generalFields['contactBuyerSuccessMsg'] = "You have to Login First"
        setTimeout(() => {
          this.offerSuccess = true
        }, 100);
        setTimeout(() => {
          this.offerSuccess = false
        }, 3000);
      }
    })
  }
  sendContact(buyerMsg, adID, authorUserId) {
    if (this.generalFields['userData'].data.login === 'true') {
      var buyerContactObj = {
        msg: this.buyerMsgs,
        ad_id: adID,
        user_id: this.generalFields['userData'].data.user_id,
        name: this.generalFields['userData'].data.user_name,
        email: this.generalFields['userData'].data.email,
        author_id: authorUserId
      }
      this.generalVarArr['contactBuyer'] = this.singleCarService.contactBuyer(buyerContactObj)
        .subscribe(res => {
          this.generalFields['contactBuyerSuccessMsg'] = res.msg
          setTimeout(() => {
            this.offerSuccess = true
          }, 100);
        })
    }
    jQuery(($) => {
      $(".buyerMsg").fadeOut(1000);
    })
    this.buyerMsgs = ''
    setTimeout(() => {
      this.offerSuccess = false
    }, 3000);
  }
  submitOffer(formData: any) {
    if (this.generalFields['userData'].data.login === 'true') {
      var offerObj = {
        ad_id: this.paramsID,
        cell_number: this.generalFields['userData'].data.cell_number,
        name: this.generalFields['userData'].data.user_name,
        offer: this.offerForm.value.offer
      }
    }
    else {
      var offerObj = {
        ad_id: this.paramsID,
        cell_number: this.offerForm.value.cell_number,
        name: this.offerForm.value.username,
        offer: this.offerForm.value.offer
      }
    }
    this.generalVarArr['makeOfferForm'] = this.singleCarService.makeOfferForm(offerObj)
      .subscribe(res => {
        this.generalFields['SuccessMsg'] = res.msg
        this.makeOfferSuccess = true
      },
        error => {
          this.generalFields['errorMsg'] = error.error.msg
          this.offerFailure = true
        }
      )
    setTimeout(() => {
      this.makeOfferSuccess = false
      this.offerFailure = false
      jQuery(($) => {
        $('#offerModal').modal('hide');
      })
      this.offerForm.reset();
    }, 4000);
  }
  recentCarData(event) {
    this.singleCarData(event)
    this.onActivate()
  }
  printAd(event) {
    jQuery("#waitingDiv").show();
    jQuery(".print-main").show();
    // this.loading = true
    setTimeout(() => {
      html2canvas(document.querySelector(".print-main")).then(canvas => {
        jQuery(".print-main").hide();
        jQuery("#waitingDiv").hide();
        var WinPrint = window.open('', '', 'width=900,height=650');
        this.loading = false
        WinPrint.document.write('<img  src="' + canvas.toDataURL("image/png") + '" class="test">');
        WinPrint.document.close()
        WinPrint.onload = function () {
          WinPrint.focus();
          WinPrint.print();
          WinPrint.close();
        }
      });
    }, 2000);
  }
  
  onActivate() {
    jQuery('html, body').animate({
      scrollTop: 0
    }, 200);
  }
  reportOpen() {
    jQuery('#reportAd .modal-body .rep-wrap').show()
    jQuery('#reportAd .modal-body .rep-msg').remove()
    jQuery('#reportAd form')[0].reset()
  }
  sendReport(formData: any) {
    let reportObj = {
      ad_id: this.paramsID,
      message: formData.value.radioClick
    }
    this.generalVarArr['reportAd'] = this.singleCarService.reportAd(reportObj)
      .subscribe(res => {
        if (res.status == 'success') {
          jQuery('#reportAd .modal-body .rep-wrap').hide()
          jQuery('#reportAd .modal-body ').append("<h3 class='rep-msg'>Report submitted successfully!</h3>")
          setTimeout(() => {
            jQuery('#reportAd .close').click()
          }, 2000)
        }
        else {
          jQuery('#reportAd .modal-body .rep-wrap').hide()
          jQuery('#reportAd .modal-body ').append("<h3 class='rep-msg'>Something wrong!</h3>")
          setTimeout(() => {
            jQuery('#reportAd .close').click()
          }, 2000)
        }
      }, error => {
        jQuery('#reportAd .modal-body .rep-wrap').hide()
        jQuery('#reportAd .modal-body ').append("<h3 class='rep-msg'>Something wrong!</h3>")
        setTimeout(() => {
          jQuery('#reportAd .close').click()
        }, 2000)
      }
      )

  }
  otherText() {
    this.generalFields['otherInput'] = true
    this.generalFields['radioClick'] = ''
  }
  otherRadio() {
    this.generalFields['other'] = ''
    this.generalFields['otherInput'] = false
  }

  activeSaveAd() {
    if (this.generalFields['userData']){
      if (this.generalFields['userData'].data.login === 'false') {
        this.heartAdsArr = JSON.parse(localStorage.getItem("heartObj")) || []
      }
    }
  }
  saveAd(adID) {
    if (this.generalFields['userData'].data.login === 'true') {
      let heartObj = {
        user_id: this.generalFields['userData'].data.user_id,
        ad_id: adID
      }
      this.generalVarArr['saveAds'] = this.usedCarService.saveAds(heartObj)
        .subscribe(res => {
          if (res.msg === "ad saved successfully") {
            this.showSaveAd()
            this.saveAdsID.push(adID)
          }
          else {
            this.hideSaveAd()
            this.saveAdsID.splice(this.saveAdsID.indexOf(adID), 1)
          }
          localStorage.setItem("uHeartObj", JSON.stringify(this.saveAdsID))
          this.transferDataService.transfersaveAdData(this.saveAdsID.length)
        })
    }
    else {
      this.heartAdsArr = JSON.parse(localStorage.getItem("heartObj")) || []
      if (this.heartAdsArr.indexOf(adID) == -1) {
        this.heartAdsArr.push(adID)
        this.showSaveAd()
      }
      else {
        this.heartAdsArr.splice(this.heartAdsArr.indexOf(adID), 1)
        this.hideSaveAd()
      }
      this.transferDataService.transfersaveAdData(this.heartAdsArr.length)
      localStorage.setItem("heartObj", JSON.stringify(this.heartAdsArr))
    }
  }

  showSaveAd() {
    this.generalFields['saveAdShow'] = true
    setTimeout(() => {
      this.generalFields['saveAdShow'] = false
    }, 2000);
  }
  hideSaveAd() {
    this.generalFields['saveAdHide'] = true
    setTimeout(() => {
      this.generalFields['saveAdHide'] = false
    }, 2000);
  }

  ngOnDestroy() {
    if (this.generalVarArr['usedCarSingle']) {
      this.generalVarArr['usedCarSingle'].unsubscribe()
    }
    if (this.generalVarArr['collapseAPI']) {
      this.generalVarArr['collapseAPI'].unsubscribe()
    }
    if (this.generalVarArr['postCellNumber']) {
      this.generalVarArr['postCellNumber'].unsubscribe()
    }
    if (this.generalVarArr['contactBuyer']) {
      this.generalVarArr['contactBuyer'].unsubscribe()
    }
    if (this.generalVarArr['makeOfferForm']) {
      this.generalVarArr['makeOfferForm'].unsubscribe()
    }
    if (this.generalVarArr['reportAd']) {
      this.generalVarArr['reportAd'].unsubscribe()
    }
    if (this.generalVarArr['saveAds']) {
      this.generalVarArr['saveAds'].unsubscribe()
    }
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
