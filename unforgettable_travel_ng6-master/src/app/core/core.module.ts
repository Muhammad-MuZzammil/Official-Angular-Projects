import { TravelFormService } from './services/travel-form.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[TravelFormService],
  declarations: []
})
export class CoreModule { }
