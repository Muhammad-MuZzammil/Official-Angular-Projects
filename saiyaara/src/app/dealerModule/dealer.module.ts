import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerService } from './services/dealer.service';
import { DealerShowroomListingComponent } from './sub-components/dealer-showroom-listing/dealer-showroom-listing.component';
import { DealerFilterComponent } from './sub-components/dealer-filter/dealer-.component';
import { AppRoutingModule } from './../app-routing.module';
import { CarDealerComponent } from './sub-components/car-dealer/car-dealer.component';
import { DealerHeaderComponent } from './sub-components/dealer-header/dealer-header.component';
import { NgxLoadingModule } from 'ngx-loading';

import { DealerDescriptionComponent } from './dealer-single-car/dealer-description/dealer-description.component';
import { FeaturedInventoryComponent } from './dealer-single-car/featured-inventory/featured-inventory.component';
import { CarDealerSingleComponent } from './dealer-single-car/car-dealer-single/car-dealer-single.component';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
// or
import { AgmCoreModule } from '@agm/core'            // @agm/core
import { AgmDirectionModule } from 'agm-direction'   // agm-direction
import { TruncatePipe } from '../truncate.pipe'
import { DealerRoutingModule } from './dealer-routing.module';
@NgModule({
  imports: [
    CommonModule,
    // AppRoutingModule,
    FormsModule,
    NgxLoadingModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyA3t-HwcJ3Z7plu1TVE58nWwu_t6qhPzxs',   // GoogleAPIs
    }),
    AgmDirectionModule,      // agm-direction
    DealerRoutingModule
  ],
  declarations: [
    DealerHeaderComponent,
    CarDealerComponent,
    DealerFilterComponent,
    DealerShowroomListingComponent,
    DealerDescriptionComponent,
    FeaturedInventoryComponent,
    CarDealerSingleComponent,
    TruncatePipe
  ],
  exports: [
    DealerHeaderComponent,
    CarDealerComponent,
    DealerFilterComponent,
    DealerShowroomListingComponent,
    DealerDescriptionComponent,
    FeaturedInventoryComponent,
    CarDealerSingleComponent

  ],
  providers: [DealerService]
})
export class DealerModule { }
