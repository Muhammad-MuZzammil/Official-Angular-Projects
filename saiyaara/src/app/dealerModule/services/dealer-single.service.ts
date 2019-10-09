import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { baseUrl } from './../../mainComponents/baseUrl';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from './../../mainComponents/rxjs-utills';

@Injectable({
  providedIn: 'root'
})
export class DealerSingleService {

  constructor(private http:HttpClient) { }
  getSingleDealer(obj): Observable<any> {
    let url = (obj.page) ? baseUrl + '/car-dealer-single?page='+obj.page :  baseUrl +'/car-dealer-single';
    return this.http.post<any>(url,obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
            catchError(this.handleError)
        );
  }
  getReviews(obj): Observable<any> {
    let url = (!obj.page) ? baseUrl + '/get-reviews' : baseUrl + '/get-reviews?page='+obj.page;
    return this.http.post<any>(url,obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
            catchError(this.handleError)
        );
  }
  addReview(obj): Observable<any> {
    return this.http.post<any>(baseUrl + '/user-review',obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
            catchError(this.handleError)
        );
  }
 // handleError
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
