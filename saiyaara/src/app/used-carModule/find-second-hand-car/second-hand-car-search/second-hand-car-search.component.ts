import { Router } from '@angular/router';
import { UsedCarService } from './../../services/used-car.service';
import { HomeService } from './../../../homeModule/services/home.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
declare var jQuery: any;
declare var document: any;

@Component({
  selector: 'second-hand-car-search',
  templateUrl: './second-hand-car-search.component.html',
  styleUrls: ['./second-hand-car-search.component.css']
})
export class SecondHandCarSearchComponent implements OnInit, OnChanges {
  generalFieldArr = []
  selectManuFect; // HTML select element of manufacture car
  carManufec = []; // car manufacture array
  cities = []; //cities array
  carColorArr = [] // colors array
  transmissions = [] // transmission array
  engineTypes = [] // engine type array
  assemblies = [] // assembly array
  selectCarNameArr = []; //car name array
  selectCarName; // HTML select element of car name
  carModelArr = []; //car model array
  selectCities; // HTML select element of cities
  selectColor; // HTML select element of colors
  selectTransmissoin; // HTML select element of transmissions
  selectEngineType; // HTML select element of enginge type
  selectAssembly; // HTML select element of Assembly
  MinPriceArr = [] // minimum price array
  MaxPriceArr = [] // maximum price array
  selectPriceRange; // HTML select element of price
  selectMinPrice
  selectMaxPrice
  carNameSearchCount
  showOption = true
  carDetail: any
  adCities = []
  generalVarArr = []
  regCities: { id: string; text: string; disabled: boolean; selected: boolean; }[];
  selectRegCities: any;
  selectColors
  loading = false;
  initialminPriceArr = 0
  selectCarModel
  selectEngingeTypes
  selectTransmission
  constructor(private usedCarService: UsedCarService, private router: Router, private transferDataService: TransferDataService, private homeService: HomeService) { }
  @Input() carDescs = {}
  ngOnInit() {
    this.MinPriceArr = [{
      id: '',
      text: 'Select Min Price',
      disabled: true,
      selected: true
    }]
    this.initialminPriceArr = 0;
    let incrVal = 50000;
    for (let i = 1; i < 2000; i++) {
      if(this.initialminPriceArr >= 10000000) incrVal = 100000;
      this.initialminPriceArr = this.initialminPriceArr + incrVal;
      if(this.initialminPriceArr  <= 100000000)
      {
        this.MinPriceArr.push({
          id: this.initialminPriceArr,
          text: 'PKR ' + this.price_format(this.initialminPriceArr + ''),
          disabled: false,
          selected: false
        })
      }
    }
    let thisClass
    thisClass = this
    jQuery(function () {
      jQuery('.selectpicker').each(function () {
        let sel = jQuery(this).attr('name')
        $(this).find('select.select2-hidden-accessible').attr('name', sel)
      })
      jQuery('select.select2-hidden-accessible').eq(0).change(function () {
        thisClass.selectCarName = (thisClass.selectCarName) ? "" : thisClass.selectCarName
        thisClass.selectCarNameArr = [];
        thisClass.carModelArr = []
        thisClass.selectManuFect = this.value
        if (thisClass.selectManuFect) {
          thisClass.loading = true;
          let manufectObj = {
            id: this.value
          }
          thisClass.generalVarArr['carManufectData'] = thisClass.homeService.carManufectData(manufectObj) // post data of manufacture car
            .subscribe(res => {
              setTimeout(() => {
                let carNameArr = [{
                  id: '',
                  text: 'Select Car Name',
                  disabled: true,
                  selected: true,
                  search_count: 0
                }]
                for (let man in res['manufacture_rec']) {
                  carNameArr.push(
                    {
                      id: res['manufacture_rec'][man].id,
                      text: res['manufacture_rec'][man].name,
                      disabled: false,
                      selected: false,
                      search_count: res['manufacture_rec'][man].search_count,
                    }
                  );
                }
                thisClass.selectCarNameArr = carNameArr
                thisClass.loading = false;
              }, 1000);
            })
        }
      });
      jQuery('select.select2-hidden-accessible').eq(1).change(function () {
        thisClass.selectCarName = this.value
        if (thisClass.selectCarName) {
          thisClass.selectCarModel = false;
          thisClass.loading = true;
          // thisClass.quickSearchValue()
          let carNameObj = {
            id: this.value
          }
          thisClass.generalVarArr['carName'] = thisClass.homeService.carName(carNameObj)
            .subscribe(res => {
              setTimeout(() => {
                let carModelArr = [{
                  id: '',
                  text: 'Select Car Model',
                  disabled: true,
                  selected: true
                }]
                for (const carName in res['car_name_rec']) {
                  carModelArr.push({
                    id: res['car_name_rec'][carName].id,
                    text: res['car_name_rec'][carName].name,
                    disabled: false,
                    selected: false
                  })
                }
                thisClass.carModelArr = carModelArr
                thisClass.loading = false;
              }, 1000)
            })
        }
      })
      jQuery('select.select2-hidden-accessible').eq(2).change(function () {
        thisClass.selectCarModel = this.value
        if(!thisClass.selectCarModel) return;
        thisClass.loading = true;
        setTimeout(() => {
          thisClass.loading = false;
        }, 600);
      });
      jQuery('select.select2-hidden-accessible').eq(3).change(function () {
        thisClass.selectCities = this.value
        if(!thisClass.selectCities) return
        thisClass.loading = true;
        setTimeout(() => {
          thisClass.loading = false;
        }, 600);
      })
      jQuery('select.select2-hidden-accessible').eq(4).change(function () {
        thisClass.loading = true;
        thisClass.selectMinPrice = this.value
        thisClass.selectMaxPrice = ""
        var convertMinPrice = parseInt(this.value)
        let MaxPriceFArr = []
        MaxPriceFArr = [{
          id: '',
          text: 'Select Max Price',
          disabled: true,
          selected: true,
        }]
        let incrVal = 50000
        for (let i = 0; i < 2000; i++) {
          if(convertMinPrice >= 10000000) incrVal = 100000;
          convertMinPrice = convertMinPrice + incrVal
          let formatPrice = 'PKR ' + thisClass.price_format((convertMinPrice + ''));
          if(convertMinPrice  <= 100000000)
          {
            MaxPriceFArr.push({
              id: convertMinPrice,
              text: formatPrice,
              disabled: false,
              selected: false,
            })
          }
        }
        if(this.value  == 100000000)
        {
          MaxPriceFArr.push({
            id: 100000000,
            text: 'PKR 10.00 Cr',
            disabled: false,
            selected: false,
          })
        }
        thisClass.MaxPriceArr = MaxPriceFArr
        thisClass.loading = false;
      });
      jQuery('select.select2-hidden-accessible').eq(5).change(function () {
        thisClass.selectMaxPrice = this.value
        if(!thisClass.selectMaxPrice) return
        thisClass.loading = true;
        setTimeout(() => {
          thisClass.loading = false;
        }, 600);
      });
      jQuery('select.select2-hidden-accessible').eq(6).change(function () {
        thisClass.selectColors = this.value
        if(!thisClass.selectColors) return
        thisClass.loading = true;
        setTimeout(() => {
          thisClass.loading = false;
        }, 600);
      })
      jQuery('select.select2-hidden-accessible').eq(7).change(function () {
        thisClass.selectRegCities = this.value
        if(!thisClass.selectRegCities) return
        thisClass.loading = true;
        setTimeout(() => {
          thisClass.loading = false;
        }, 600);
      })
      
    })
  }
  divider($number_of_digits) {
    let $tens = "1";
    if ($number_of_digits > 8)
      return 10000000;
    while (($number_of_digits - 1) > 0) {
      $tens += "0";
      $number_of_digits--;
    }
    return $tens;
  }

  price_format($num) {
    let $ext = "";
    let $number_of_digits
    let $divider
    let $fraction
    $number_of_digits = $num.length
    if ($number_of_digits > 3) {
      if ($number_of_digits % 2 != 0)
        $divider = this.divider($number_of_digits - 1);
      else
        $divider = this.divider($number_of_digits);
    }
    else
      $divider = 1;
    $fraction = $num / $divider;
    $fraction = $fraction.toFixed(2);
    if ($number_of_digits == 4 || $number_of_digits == 5)
      $ext = "k";
    if ($number_of_digits == 6 || $number_of_digits == 7)
      $ext = "Lac";
    if ($number_of_digits == 8 || $number_of_digits == 9)
      $ext = "Cr";

    return $fraction + " " + $ext;
  }
  loadingTrigger() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 600);
  }
  ngOnChanges(simple: SimpleChanges) {
    this.carDetail = this.carDescs;
    if (!this.carDetail) return
    let manuFArr = [{
      id: '',
      text: 'Select Manufacture',
      disabled: true,
      selected: true
    }]
    for (const key in this.carDetail.manufactures) {
      manuFArr.push({
        id: this.carDetail.manufactures[key].id,
        text: this.carDetail.manufactures[key].name,
        disabled: false,
        selected: false
      })
    }
    this.carManufec = manuFArr

    let adCityArr = [{
      id: '',
      text: 'Select City',
      disabled: true,
      selected: true,
    }]
    for (const key in this.carDetail.citys) {
      adCityArr.push({
        id: this.carDetail.citys[key].id,
        text: this.carDetail.citys[key].name,
        disabled: false,
        selected: false
      })
    }
    this.adCities = adCityArr
    let regCityArr = [{
      id: '',
      text: 'Select Register City',
      disabled: true,
      selected: true

    }]
    for (const key in this.carDetail.citys) {
      regCityArr.push({
        id: this.carDetail.citys[key].id,
        text: this.carDetail.citys[key].name,
        disabled: false,
        selected: false
      })
    }
    this.regCities = regCityArr

    let colorArr = [{
      id: '',
      text: 'Select Color',
      disabled: true,
      selected: true
    }]
    for (const key in this.carDetail.colors) {
      colorArr.push({
        id: this.carDetail.colors[key].id,
        text: this.carDetail.colors[key].name,
        disabled: false,
        selected: false
      })
    }
    this.carColorArr = colorArr
    this.transmissions = this.carDetail.tranmissoin
    this.engineTypes = this.carDetail.engine_type
    this.assemblies = this.carDetail.assembly
  }
  moreSearch() {
    this.showOption = !this.showOption
    jQuery(($) => {
      $(".moreSearchDiv").toggle()
    })
  }
  findCarCount(obj, key) {
    let carS = ""
    obj.forEach(element => {
      if (element.id == key) {
        carS = element.search_count
      }
    });
    return carS
  }
  secondHandCarSubmit() {
    var object = {};
    let formData;
    formData = new FormData(document.querySelector('#secondHandCarSearch'))
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    if(this.selectCarName){
      object['car_name_id'] = this.selectCarName
      object['car_search_counter'] = this.findCarCount(this.selectCarNameArr, this.selectCarName)
    }
    this.router.navigate(['/used-car'], {queryParams: this.valConvert(object)})
  }
  valConvert(filterVal) {
    let obj = {'manufacture': null, 'car_name': null, 'car_model': null, 'ad_city': null,
    'reg_city': null, 'price': null, 'color': null, 'transmission': null, 
    'engine_type': null, 'saiyaara_certified': null, 'assembly': null, 
               'mileage': null, 'engine_capacity': null, 'body_type': null, 'unregister': null, 
               'car_name_id': null, 'car_search_counter': null}
    for(let f in filterVal) {
      if(f.indexOf('manufacture') != -1)
      obj['manufacture'] = [filterVal[f]]
      if (f.indexOf('car_name') != -1)
      obj['car_name'] = [filterVal[f]]
      if (f.indexOf('car_model') != -1)
        obj['car_model'] = [filterVal[f]]
        if (f.indexOf('ad_city') != -1)
        obj['ad_city'] = [filterVal[f]]
      if (f.indexOf('reg_city') != -1)
      obj['reg_city'] = [filterVal[f]]
      if (f == 'price')
      obj['price'] = filterVal[f]
      if (f == 'price1')
      obj['price'] = filterVal[f]
      if (f == 'price2')
        obj['price'] += "," + filterVal[f]
        if (f.indexOf('color') != -1)
        obj['color'] = [filterVal[f]]
      if (f.indexOf('transmission') != -1)
      obj['transmission'] = [filterVal[f]]
      if (f.indexOf('engine_type') != -1)
      obj['engine_type'] = [filterVal[f]]
      if (f.indexOf('saiyaara_certified') != -1)
        obj['saiyaara_certified'] = [filterVal[f]]
        if (f.indexOf('assembly') != -1)
        obj['assembly'] = [filterVal[f]]
        if (f.indexOf('mileage') != -1)
        obj['mileage'] = [filterVal[f]]
      if (f.indexOf('engine_capacity') != -1)
      obj['engine_capacity'] = [filterVal[f]]
      if (f.indexOf('body_type') != -1)
        obj['body_type'] = [filterVal[f]]
        if(f.indexOf('unregister') != -1)
        obj['unregister'] = [filterVal[f]]   
        if (f.indexOf('car_name_id') != -1)
        obj['car_name_id'] = [filterVal[f]]
        if (f.indexOf('car_search_counter') != -1)
        obj['car_search_counter'] = [filterVal[f]]  
      }
      return obj;
  }
  clearQ(f){
    if(f == 'engine_type')
      this.selectEngineType = '';
    else if(f == 'transmission')
      this.selectTransmissoin = '';
    else if(f == 'assembly')
      this.selectAssembly = '';
    else if(f == 'car_name')
    {
      this.carModelArr = [];
      this.selectCarModel = '';
    }  
    else if(f == 'all')
    {
      document.getElementById('secondHandCarSearch').reset();
      jQuery('#secondHandCarSearch select').val(null).trigger("change")
    }
    jQuery('select[name="'+f+'"]').val(null).trigger("change")
    this.generalVarArr['quickSearchCarAvailable'] = ''
  }
  ngOnDestroy() {
    if (this.generalVarArr['carManufectData']) {
      this.generalVarArr['carManufectData'].unsubscribe()
    }
  }

}
