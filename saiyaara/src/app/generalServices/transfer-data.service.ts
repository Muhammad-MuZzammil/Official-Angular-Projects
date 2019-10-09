import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TransferDataService {
  private data: any = new BehaviorSubject({});
  currentData = this.data.asObservable()
  constructor() { }
  transferData(item: any) {
    this.data.next(item);
  }
}

