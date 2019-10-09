import { catchError, retryWhen } from 'rxjs/operators';
import { baseUrl } from './../../../mainComponents/baseUrl';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { genericRetryStrategy } from './../../../mainComponents/rxjs-utills';

@Injectable({
  providedIn: 'root'
})
export class UsedCarSingleService {

  constructor(private http:HttpClient) { }


  usedCarSingle(obj): Observable<any> {
    return this.http.post<any>(baseUrl + `/used-car-ads-detail`,obj)
        .pipe(
        retryWhen(genericRetryStrategy()),
            catchError(this.handleError))

}
autoAlertForm(obj): Observable<any> {
  return this.http.post<any>(baseUrl + `/ad-subscribe`,obj)
      .pipe(
        retryWhen(genericRetryStrategy()),
          catchError(this.handleError))

}

makeOfferForm(obj): Observable<any> {
    return this.http.post<any>(baseUrl + '/ad-offer',obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
            catchError(this.handleError))

  }
  contactBuyer(obj): Observable<any> {
    return this.http.post<any>(baseUrl + '/ad-msg',obj)
        .pipe(
            catchError(this.handleError))

  }
 
  reportAd(obj): Observable<any> {
    return this.http.post<any>(baseUrl + '/report-ad',obj)
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
