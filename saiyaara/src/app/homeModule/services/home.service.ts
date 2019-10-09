import { catchError, retry, finalize, mergeMap, retryWhen } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { baseUrl } from './../../mainComponents/baseUrl';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { genericRetryStrategy } from '../../mainComponents/rxjs-utills';
@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient) { }

  featureAds(): Observable<any> {
    return this.http.get<any>(baseUrl + '/feature-ads')
     .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(this.handleError));
  }
  totalCarCount(): Observable<any> {
    return this.http.get<any>(baseUrl + '/total-car-count')
        .pipe(
        retryWhen(genericRetryStrategy()),
          catchError(this.handleError))

  }
 wholeQuickSearchData(obj){
  return this.http.post(baseUrl + '/quick-search-ad-count',obj)
  .pipe(
    retryWhen(genericRetryStrategy()),
    catchError(this.handleError))
}

carManufectData(manuFectObj){
  return this.http.post(baseUrl + '/get-manufacture',manuFectObj)
  .pipe(
    retryWhen(genericRetryStrategy()),
    catchError(this.handleError))
}
carManufectData2(manuFectObj){
  return this.http.post(baseUrl + '/get-manuf-with-count',manuFectObj)
  .pipe(
    retryWhen(genericRetryStrategy()),
    catchError(this.handleError))
}
carName(manuFectObj){
  return this.http.post(baseUrl + '/get-car-model',manuFectObj)
  .pipe(
    retryWhen(genericRetryStrategy()),
    catchError(this.handleError))
}
carName2(manuFectObj){
  return this.http.post(baseUrl + '/get-model-with-count',manuFectObj)
  .pipe(
    retryWhen(genericRetryStrategy()),
    catchError(this.handleError))
}
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
  }
  else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code $ {error.status}, ` +
          `body was:$ {error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(error);
};
}
