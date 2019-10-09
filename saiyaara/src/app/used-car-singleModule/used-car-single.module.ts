import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './../app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondHandCarSearchComponent } from './../used-carModule/find-second-hand-car/second-hand-car-search/second-hand-car-search.component';
import { SecondHandUsedCarComponent } from './../used-carModule/find-second-hand-car/second-hand-used-car/second-hand-used-car.component';
import { CarRateUnder10LacsComponent } from './../used-carModule/find-second-hand-car/car-rate-under10-lacs/car-rate-under10-lacs.component';
import { CarRateUnder20LacsComponent } from './../used-carModule/find-second-hand-car/car-rate-under20-lacs/car-rate-under20-lacs.component';
import { CarRateUnder30LacsComponent } from './../used-carModule/find-second-hand-car/car-rate-under30-lacs/car-rate-under30-lacs.component';
import { UserCarSeelectionComponent } from './../used-carModule/find-second-hand-car/user-car-seelection/user-car-seelection.component';
import { UsedCarService } from './../used-carModule/services/used-car.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { UsedCarSingleRoutingModule } from './used-car-single-routing.module';
@NgModule({
  imports: [
  CommonModule,
    // AppRoutingModule,
    NgxLoadingModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    Select2Module,
    UsedCarSingleRoutingModule
  ],
  declarations: [
    SecondHandUsedCarComponent,
    SecondHandCarSearchComponent,
    CarRateUnder10LacsComponent,
    CarRateUnder20LacsComponent,
    CarRateUnder30LacsComponent,
    UserCarSeelectionComponent,
  ],
  exports: [
    SecondHandUsedCarComponent,
    SecondHandCarSearchComponent,
    CarRateUnder10LacsComponent,
    CarRateUnder20LacsComponent,
    CarRateUnder30LacsComponent,
    UserCarSeelectionComponent,


  ],
  providers: [UsedCarService]

})
export class UsedCarSingleModuleModule { }

