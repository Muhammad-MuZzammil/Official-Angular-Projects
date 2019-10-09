import { Directive, ElementRef, Renderer } from "@angular/core";
declare var jQuery: any;
import { DatePipe } from "@angular/common";

@Directive({
  selector: "[appDatePicker]"
})
export class DatePickerDirective {
  constructor(
    public el: ElementRef,
    public renderer: Renderer,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    var curYear = new Date().getFullYear();
    jQuery(this.el.nativeElement).datepicker({
      onSelect: dateText => {

        var datePipe = new DatePipe("en-US");
        dateText = datePipe.transform(dateText, "dd-MMM-yyyy");
        console.log(dateText);
        jQuery(this.el.nativeElement).val(dateText);
      },
      changeMonth: true,
      changeYear: true,
      yearRange: "1900:" + curYear,
      // minDate: 0
    });
  }
}

// var curYear = new Date().getFullYear();
// , changeMonth: true,changeYear: true,yearRange: '1900:'+curYear
