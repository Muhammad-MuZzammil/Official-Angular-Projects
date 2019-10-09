import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { UsedCarService } from './services/used-car.service';
import { UsedCarSingleComponent } from './used-car-single/used-car-single/used-car-single.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';


import { UsedCarComponent } from './sub-components/used-car/used-car.component';
import { UsedCarListComponent } from './sub-components/used-car-list/used-car-list.component';
import { HeadSectionComponent } from './sub-components/head-section/head-section.component';
import { AdsInUsedCarComponent } from './sub-components/ads-in-used-car/ads-in-used-car.component';
import { CarDetailsComponent } from './used-car-single/car-details/car-details.component';
import { QuestionAnsComponent } from './used-car-single/question-ans/question-ans.component';
import { FinanceAreaComponent } from './used-car-single/finance-area/finance-area.component';
import { CarInspectionComponent } from './used-car-single/car-inspection/car-inspection.component';
import { RecentViewedComponent } from './used-car-single/recent-viewed/recent-viewed.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SearchPipe } from '../search.pipe';
import { UsedCarRoutingModule } from './used-car-routing.module';
@NgModule({
  imports: [
    CommonModule,
    // AppRoutingModule,
    // LoadingModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    UsedCarRoutingModule
    
  ],
  declarations: [
    UsedCarComponent,
    AdsInUsedCarComponent,
    HeadSectionComponent,
    UsedCarListComponent,
    UsedCarSingleComponent,
    CarDetailsComponent,
    QuestionAnsComponent,
    FinanceAreaComponent,
    CarInspectionComponent,
    RecentViewedComponent,
    SearchPipe 
  ],
  exports: [
    UsedCarListComponent,
    UsedCarComponent,
    AdsInUsedCarComponent,
    HeadSectionComponent,
    UsedCarSingleComponent,
    CarDetailsComponent,
    QuestionAnsComponent,
    FinanceAreaComponent,
    CarInspectionComponent,
    RecentViewedComponent,
  ],
  providers: [UsedCarService]
})
export class UsedCarModule { }
