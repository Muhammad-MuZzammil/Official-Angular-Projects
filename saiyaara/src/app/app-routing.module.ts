import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { AboutSaiyaaraComponent } from './mainComponents/about-saiyaara/about-saiyaara.component';
import { ContactUsComponent } from './mainComponents/contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', loadChildren:'../app/homeModule/home.module#HomeModule' },
      { path: 'second-hand-used-car', loadChildren: '../app/used-car-singleModule/used-car-single.module#UsedCarSingleModuleModule' },
      { path: 'used-car', loadChildren: '../app/used-carModule/used-car.module#UsedCarModule' },
      { path: 'used-car', loadChildren: '../app/used-carModule/used-car.module#UsedCarModule' },
      { path: 'used-car-single', loadChildren:'../app/used-carModule/used-car.module#UsedCarModule' },
      { path: 'car-dealer', loadChildren: '../app/dealerModule/dealer.module#DealerModule' },
      { path: 'car-dealer-single', loadChildren: '../app/dealerModule/dealer.module#DealerModule' },
      // { path: 'contact-us', component: ContactUsComponent },
      // { path: 'about-saiyaara', component: AboutSaiyaaraComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }

    ]
  )
  ],
  declarations: [],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
