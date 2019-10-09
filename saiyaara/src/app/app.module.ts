import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { PopoverModule } from 'ngx-bootstrap/popover';
/// import your Spinner module

import { TransferDataService } from './generalServices/tranfer-data-service/transfer-data.service';

import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core'            // @agm/core
import { AgmDirectionModule } from 'agm-direction'   // agm-direction
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './mainComponents/header/header.component';
import { FooterComponent } from './mainComponents/footer/footer.component';
import { AboutSaiyaaraComponent } from './mainComponents/about-saiyaara/about-saiyaara.component';
import { ContactUsComponent } from './mainComponents/contact-us/contact-us.component';
import { CommonService } from './common.service';
import { NgxLoadingModule,ngxLoadingAnimationTypes  } from 'ngx-loading';
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutSaiyaaraComponent,
    ContactUsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyA3t-HwcJ3Z7plu1TVE58nWwu_t6qhPzxs',   // GoogleAPIs
    }),
    AgmDirectionModule,      // agm-direction
    
  ],

  providers: [TransferDataService,  CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
