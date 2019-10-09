import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { baseUrl } from 'src/app/mainComponents/baseUrl';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from './mainComponents/rxjs-utills';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  is_login() : Observable<any>{
    return this.http.get<any>(baseUrl + '/is-login')
    .pipe(
      retryWhen(genericRetryStrategy()),
      catchError(this.handleError));
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
}
}
