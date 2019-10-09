import { Component, OnInit, Input } from '@angular/core';
import { DealerService } from './../../services/dealer.service';
import { TransferDataService } from './../../../generalServices/tranfer-data-service/transfer-data.service';
import { DealerShowroomListingComponent } from './../dealer-showroom-listing/dealer-showroom-listing.component';

@Component({
  // providers:[DealerShowroomListingComponent],
  selector: 'dealer-filter',
  templateUrl: './dealer-filter.component.html',
  styleUrls: ['./dealer-filter.component.css']
})
export class DealerFilterComponent implements OnInit {

  constructor(private dealerService: DealerService,  private transferDataService:TransferDataService) { }

  ngOnInit() {

  }

}// DealerFilterComponent

