import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import * as toastr from "toastr";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "thank-you",
  templateUrl: "./thank-you.component.html",
  styleUrls: ["./thank-you.component.css"]
})
export class ThankYouComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  alreadySubmit: boolean = false;
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params.submit == 'submitted'){
        this.alreadySubmit =true

      }
    })
  }
}
