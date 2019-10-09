import { DatePickerDirective } from './date-picker.directive';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { dateFormatPipe } from './date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DatePickerDirective, dateFormatPipe],
  providers:[DatePipe],
  exports:[DatePickerDirective,dateFormatPipe]
})
export class SharedModule { }
