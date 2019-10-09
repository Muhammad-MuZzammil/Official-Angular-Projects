import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsedCarSingleService } from './../services/used-car-single.service';
import { catchError } from 'rxjs/operators';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';

@Component({
  selector: 'car-inspection',
  templateUrl: './car-inspection.component.html',
  styleUrls: ['./car-inspection.component.css']
})
export class CarInspectionComponent implements OnInit, OnChanges {
  @Input() adUserID: any

  generalFields:any = {}
  paramsID
  alreadySubscribedError
  autoAlertSuccess
  submitSuccessAlert = false;
  submitErrorAlert = false;
  validEmail = "Please Enter a valid Email"
  emailRequired = "Please Enter your Email"
  cellNumberRequired = "Please Enter Cell Number"
  cellNumberMax = "Phone Number exactly 11 digits"

  constructor(
    private transferDataService: TransferDataService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private usedCarSingleService: UsedCarSingleService
  ) { }
  // /^[0-9]+(\.?[0-9]+)?$/
  email = new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);
  cell_number = new FormControl('', [Validators.required, Validators.pattern('[0-9]{11}')]);
  generalVarArr:any = {}
  autoALertForm: FormGroup = this.fb.group({
    email: this.email,
    cell_number: this.cell_number
  })
  ngOnChanges() {
  }
  ngOnInit() {
    this.isLoggedIn()
    this.activeRoute.params.subscribe((parameter: any) => {
      this.paramsID = parameter['id']
      if (this.generalFields['userData'].data.login === 'true') {
        this.autoALertForm.patchValue({
          email: this.generalFields['userData'].data.email,
          cell_number: this.generalFields['userData'].data.cell_number
       });
      }
    })
  }
  isLoggedIn(): any {
    this.generalFields['userData'] = JSON.parse(localStorage.getItem('userData'))
  }
  autoForm(formData: any) {
    if (this.generalFields['userData'].data.login === 'true') {
      formData.ad_id = this.paramsID
      formData.user_id = this.generalFields['userData'].data.user_id
    }
    else {
      formData.ad_id = this.paramsID
    }
    //u have to send login user ID in formData obj later
    this.autoAlertFunc(formData)
  }
  autoAlertFunc(formData) {
    this.generalVarArr['autoAlertForm'] =  this.usedCarSingleService.autoAlertForm(formData)
      .subscribe(res => {
        this.autoAlertSuccess = res.msg;
        this.submitSuccessAlert = true
        setTimeout(() => {
          this.submitSuccessAlert = false
          this.submitErrorAlert = false
        }, 2000)
      },
        error => {
          this.submitErrorAlert = true
          setTimeout(() => {
            this.submitErrorAlert = false
            this.submitSuccessAlert = false
          }, 2000)
          this.alreadySubscribedError = error.error.msg
        }
      )
  }
  formFieldsFocus(formFields) {
    formFields = true
    setTimeout(() => {
      formFields = false
    }, 2000);
  }
  ngOnDestroy() {
    if (this.generalVarArr['autoAlertForm']) {
      this.generalVarArr['autoAlertForm'].unsubscribe()
    }
  }
}
