import { catchError,  retryWhen } from 'rxjs/operators';
import { baseUrl } from './../../mainComponents/baseUrl';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { genericRetryStrategy } from './../../mainComponents/rxjs-utills';

@Injectable({
    providedIn: 'root'
})
export class UsedCarService {

    constructor(private http: HttpClient) { }

    collapseAPI(obj): Observable<any> {
        return this.http.post<any>(baseUrl + '/view-counter',obj)
            .pipe(
              retryWhen(genericRetryStrategy()),
                catchError(this.handleError)
            );
    }
    /* usedCarAds(): Observable<any> {
        return this.http.get<any>(baseUrl + '/used-car-ads')
            .pipe(
              retryWhen(genericRetryStrategy()),
                catchError(this.handleError)
            );
    }

    // slidersData(sliderObj): Observable<any> {
    //     return this.http.post<any>(baseUrl + '/used-car-ads',sliderObj)
    //         .pipe(
    //             catchError(this.handleError)
    //         );
    // }
    specificUserCar(id): Observable<any> {
        return this.http.post<any>(baseUrl + `/used-car-ads`,id)
            .pipe(
              retryWhen(genericRetryStrategy()),
                catchError(this.handleError))

    } */
    usedCarAds(checkBoxObj, page = null): Observable<any> {
        let url = baseUrl + '/used-car-ads';
        if(page) url = baseUrl + '/used-car-ads?page='+page
        return this.http.post(url, checkBoxObj)
            .pipe(
              retryWhen(genericRetryStrategy()),
                catchError(this.handleError)
            );
    }
    saveAds(obj): Observable<any> {
        return this.http.post(baseUrl + '/save-ad', obj)
            .pipe(
              retryWhen(genericRetryStrategy()),
                catchError(this.handleError)
            );
    }

    postCellNumber(checkBoxObj): Observable<any> {
        return this.http.post(baseUrl + '/number-counter', checkBoxObj)
            .pipe(
              retryWhen(genericRetryStrategy()),
                catchError(this.handleError)
            );
    }
    secondHandCar(): Observable<any> {
        return this.http.get(baseUrl + '/find-sec-hand-car')
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
