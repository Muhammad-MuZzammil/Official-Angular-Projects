import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {
  private data: any = new BehaviorSubject({});
  private saveAdData: any = new BehaviorSubject([]);
  private queryParams: any = new BehaviorSubject({});
  currentData = this.data.asObservable()
  currentSaveAdData = this.saveAdData.asObservable()
  queryPara = this.queryParams.asObservable()
  constructor() { }

  transferData(item: any) {
    this.data.next(item);
  }

  transfersaveAdData(item: any) {
    this.saveAdData.next(item);
  }
  transferQueryParams(item: any) {
    this.queryParams.next(item);
  }
}

