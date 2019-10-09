import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TravelFormService {
  constructor(private httpClient: HttpClient) {}

  postForm(path: string, formObj:Object={}): Observable<any> {
    return this.httpClient
      .post(`${environment.api_url}${path}`, formObj, {
        headers: new HttpHeaders({
          "content-Type": "application/x-www-form-urlencoded"
        })
      })
      .pipe(catchError(this.handleError));
  }
  getForm(path:string,id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.api_url}${path}/${id}`)
      .pipe(catchError(this.handleError))
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error :", errorResponse.error.message);
    } else {
      console.error("Server Side Error :", errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    return throwError(
      "There is a problem with the service We are notified & working on it. Please try again later."
    );
  }
}
