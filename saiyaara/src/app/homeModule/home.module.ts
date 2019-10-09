import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from './services/home.service';
import { AppRoutingModule } from './../app-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './sub-components/home/home.component';
import { HeaderCarouselComponent } from './sub-components/header-carousel/header-carousel.component';
import { QuickCarSearchComponent } from './sub-components/quick-car-search/quick-car-search.component';
import { RecentCarCarouselComponent } from './sub-components/recent-car-carousel/recent-car-carousel.component';
import { SecSaiyaaraComponent } from './sub-components/sec-saiyaara/sec-saiyaara.component';
import { Sec4SaiyaaraComponent } from './sub-components/sec4-saiyaara/sec4-saiyaara.component';
import { Sec5SaiyaaraComponent } from './sub-components/sec5-saiyaara/sec5-saiyaara.component';
import { Sec6SaiyaaraComponent } from './sub-components/sec6-saiyaara/sec6-saiyaara.component';
import { Sec7SaiyaaraComponent } from './sub-components/sec7-saiyaara/sec7-saiyaara.component';
import { Sec8SaiyaaraComponent } from './sub-components/sec8-saiyaara/sec8-saiyaara.component';
import {  NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';
import { Sec9SaiyaaraComponent } from './sub-components/sec9-saiyaara/sec9-saiyaara.component';
import { PopoverModule } from 'ngx-bootstrap/popover'
import { Select2Module } from 'ng2-select2';
import { HomeRoutingModule } from './home-routing.module';
// import { Router } from '@angular/router'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    PopoverModule.forRoot(),
    Select2Module,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HeaderCarouselComponent,
    QuickCarSearchComponent,
    RecentCarCarouselComponent,
    SecSaiyaaraComponent,
    Sec4SaiyaaraComponent,
    Sec5SaiyaaraComponent,
    Sec6SaiyaaraComponent,
    Sec7SaiyaaraComponent,
    Sec8SaiyaaraComponent,
    Sec9SaiyaaraComponent,

  ],

  exports: [
    HeaderCarouselComponent,
    QuickCarSearchComponent,
    RecentCarCarouselComponent,
    SecSaiyaaraComponent,
    Sec4SaiyaaraComponent,
    Sec5SaiyaaraComponent,
    Sec6SaiyaaraComponent,
    Sec7SaiyaaraComponent,
    Sec8SaiyaaraComponent,
    Sec9SaiyaaraComponent
  ],
  providers: [HomeService]
})
export class HomeModule { }
