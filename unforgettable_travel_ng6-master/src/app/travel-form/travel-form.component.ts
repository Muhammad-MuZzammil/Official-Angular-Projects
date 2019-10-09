import { TravelFormService } from "./../core/services/travel-form.service";
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterContentChecked
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as countries from "../../assets/json/counties.json";

import * as toastr from "toastr";
@Component({
  selector: "travel-form",
  templateUrl: "./travel-form.component.html",
  styleUrls: ["./travel-form.component.css"]
})
export class TravelFormComponent implements OnInit, AfterContentChecked {
  @ViewChild("bookingForm") public createBookingForm: NgForm;
  selectArrService: boolean = false;
  selectDepService: boolean = false;
  user_id: string;
  timeForm = ["AM", "PM", "24"];
  additional_info = [];
  generalArr = [];
  additionalPsngr = [];
  additionalData = {};
  loader: boolean = false;
  initialData = {
    contact_type: "Something went wrong",
    booking_details: "",
    date_of_travel: "",
    arr_date: "",
    dep_date: "",
    reference_number: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: {
      name: "Select Country",
      id: ""
    }
  };
  countryArr = countries.default;

  constructor(
    private cdref: ChangeDetectorRef,
    private travelFormService: TravelFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngOnInit() {
    // console.log(this.createBookingForm);
    this.getParamsAndInfo();
  }
  format(input) {
    // console.log(input.value <= 9 && input.value.length == "1");
    if (input.value <= 9 && input.value.length == "1") {
      input.value = "0" + input.value;
    } else {
      let t = input.value.split("");
      if (t[0] == "0") input.value = t.slice(1).join("");
    }
  }

  wholeFormValidation() {
    this.createBookingForm.form.setErrors({
      invalidField: true
    });
  }

  addData() {
    this.additionalData = {
      name: "",
      date_of_birth: "",
      email: "",
      phone: "",
      dietary_preference: "",
      bedding_preferences: "",
      special_requirements: ""
    };
    this.additional_info.push(this.additionalData);
    this.createBookingForm.form.updateValueAndValidity();

    // console.log("additional_info", this.additional_info);
  }
  deleteArr(index) {
    this.additional_info.splice(index, 1);
    // console.log("additional_info", this.additional_info);
    // console.log("index", index);
  }
  fillData(elem, index, state) {
    // console.log(index);
    this.additional_info[index][state] = elem.target.value;
    // console.log(this.additional_info);
  }
  getParamsAndInfo() {
    this.loader = true;
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get("id");
      let obj = {
        id: this.user_id
      };

      this.travelFormService.postForm("/passenger-info", obj).subscribe(
        res => {
          if (res.msg == "invalid id") {
            this.router.navigate(["not-found"]);
          } else if (
            res.msg == "this form has been already submitted on this user id "
          ) {
            this.router.navigate(["thank-you"], {
              queryParams: { submit: "submitted" }
            });
          } else {
            // console.log(res.response.passengers);
            this.initialData = res.response.passengers;
            if (res.response.passengers.info.length == 0) {
              this.additional_info.length = 1;
            } else {
              this.additional_info = res.response.passengers.info;
              // console.log(this.additional_info.length);
            }
            this.loader = false;
          }
        },
        err => {
          toastr.error(
            "There is a problem with the service or network issue. Please try again",
            "Travel Form"
          );
          this.loader = false;
        }
      );
    });
  }
  getAdditionalInfo() {
    let additionalArr = document.querySelectorAll("#addArr input");
    for (let i = 0; i < additionalArr.length; i = i + 7) {
      this.additionalData = {
        name: additionalArr[i + 0]["value"],
        date_of_birth: additionalArr[i + 1]["value"],
        email: additionalArr[i + 2]["value"],
        phone: additionalArr[i + 3]["value"],
        dietary_preference: additionalArr[i + 4]["value"],
        bedding_preferences: additionalArr[i + 5]["value"],
        special_requirements: additionalArr[i + 6]["value"]
      };
      this.additionalPsngr.push(this.additionalData);
    }
  }

  blurField(psngr, state, index, param) {
    this.generalArr["nameIndex"] = index;
    var fullName = new RegExp("[a-zA-Z]+[ ][a-zA-Z]+");

    if (psngr == "" && state == "name") {

      this.generalArr["touchedField"] = true;
    } else {
      this.generalArr["touchedField"] = false;
    }

    if ((state == "name" && fullName.test(param.value))) {
      this.generalArr["fullNamePattern"] = false;
    } else {
      this.generalArr["fullNamePattern"] = true;
    }
    
  }
  emailValidation(state, index, param) {
    this.generalArr["emailIndex"] = index;
    var pattern = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");

    if (state == "email" && pattern.test(param.value)) {
      this.generalArr["emailPattern"] = false;
    } else {
      this.generalArr["emailPattern"] = true;
    }
  }
  psngrNameValidation() {
    for (let i = 0; i < this.additional_info.length; i++) {
      let psngr = document.querySelector(".psngr_name_" + i);
      if (psngr["value"] == "") {
        this.generalArr["psngrRequired"] = true;
        this.wholeFormValidation();
      } else {
        this.createBookingForm.form.updateValueAndValidity();
        this.generalArr["psngrRequired"] = false;
      }
    }
  }

  getArrAndDepTime(formData) {
    if (formData.arr_timeHr != undefined && formData.arr_timeMin != undefined) {
      formData["arr_Time"] =
        formData.arr_timeHr +
        ":" +
        formData.arr_timeMin +
        " " +
        (this.generalArr["arrTimeFormat"] == "24"
          ? this.generalArr["arrTimeFormat"] + "-hour"
          : this.generalArr["arrTimeFormat"]);
    }

    if (formData.arr_timeHr != undefined && formData.arr_timeMin != undefined) {
      formData["dep_Time"] =
        formData.dep_timeHr +
        ":" +
        formData.dep_timeMin +
        " " +
        (this.generalArr["depTimeFormat"] == "24"
          ? this.generalArr["depTimeFormat"] + "-hour"
          : this.generalArr["depTimeFormat"]);
    }
    delete this.createBookingForm.value.arr_timeHr;
    delete this.createBookingForm.value.arr_timeMin;
    delete this.createBookingForm.value.dep_timeHr;
    delete this.createBookingForm.value.dep_timeMin;
  }
  arrAndDepService() {
    let arr_services = this.createBookingForm.control.get("arr_service");
    let dep_services = this.createBookingForm.control.get("dep_service");

    if (arr_services.value == "") {
      this.selectArrService = true;
      this.wholeFormValidation();
      this.loader = false;
    }
    if (dep_services.value == "") {
      this.selectDepService = true;
      this.wholeFormValidation();
      this.loader = false;
    }
  }
  FormIsValid(formData) {
    if (this.createBookingForm.valid) {
      this.additionalPsngr = [];
      this.getAdditionalInfo();
      formData["addionalInfo"] = this.additionalPsngr;

      for (let i = 0; i < this.additionalPsngr.length; i++) {
        for (const key in formData) {
          if (key == "email_" + i) {
            delete formData[key];
          }
          if (key == "psngr_name_" + i) {
            delete formData[key];
          }
        }
      }
      // console.log(formData);

      this.travelFormService.postForm("/save-information", formData).subscribe(
        res => {
          // console.log(res)

          this.loader = false;
          this.router.navigate(["thank-you"]);
          // toastr.success(
          //   "Form has been submitted successfully!",
          //   "Travel Form"
          // );
        },
        err => {
          toastr.error(
            "There is a problem with the service or network issue. Please try again",
            "Travel Form"
          );
          this.loader = false;
        }
      );
    }
  }
  FormIsInvalid() {
    if (this.createBookingForm.invalid) {
      this.wholeFormValidation();
      this.fieldRequiredFocus();
      toastr.error("Please fill required field or fields!", "Travel Form");
      this.loader = false;
    }
  }
  saveBooking(arrDate, depDate) {
    // In this function sequence is very important

    // 1) passenger name validation in additional info
    this.psngrNameValidation();

    this.loader = true;
    // console.log(this.createBookingForm.value);

    // 2) Insert data in FormData Object
    let formData = this.createBookingForm.value;
    formData["user_id"] = this.user_id;
    formData["arr_date"] = arrDate;
    formData["dep_date"] = depDate;

    // 3) if Arrival and Departure service not selected then this validation will work
    this.arrAndDepService();

    // 4)
    this.getArrAndDepTime(formData); // get Arrival Time and Departure Time if airport is selected on arrival and departure info

    // 5) If form is Invalid
    this.FormIsInvalid();
    // 6)
    this.FormIsValid(formData); // If form is valid
    console.log(formData)

  }

  clickedArrService(arr_service) {
    if (arr_service.value == "arr_airport") {
      setTimeout(() => {
        let selVal = document.querySelector("#arrTimeForm");
        this.generalArr["arrTimeFormat"] = selVal["value"];
        if (selVal["value"] == "AM" || selVal["value"] == "PM") {
          this.generalArr["arrFormat"] = true;
        } else {
          this.generalArr["arrFormat"] = false;
        }
      }, 100);
    }
    if (arr_service.value !== "") {
      this.selectArrService = false;
    }
  }
  clickedDepService(dep_service) {
    if (dep_service.value == "dep_airport") {
      setTimeout(() => {
        let depTimeVal = document.querySelector("#depTimeForm");
        this.generalArr["depTimeFormat"] = depTimeVal["value"];
        if (depTimeVal["value"] == "AM" || depTimeVal["value"] == "PM") {
          this.generalArr["depFormat"] = true;
        } else {
          this.generalArr["depFormat"] = false;
        }
      }, 100);
    }
    if (dep_service.value !== "") {
      this.selectDepService = false;
    }
  }

  fieldRequiredFocus() {
    var scroll = document.querySelectorAll(".scroll");

    for (var i = 0; i < scroll.length; i++) {
      if (scroll[i]["value"] == "") {
        scroll[i]["focus"]();
        break;
      }
    }
    if (this.selectArrService) {
      this.onActivate(500);
    }
    if (this.selectDepService) {
      this.onActivate(1000);
    }
  }
  onActivate(range) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > range) {
        window.scrollTo(0, pos - 200); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
