import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { baseUrl } from './../../mainComponents/baseUrl';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, retryWhen } from 'rxjs/operators';
import { genericRetryStrategy } from './../../mainComponents/rxjs-utills';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) { }

  getPager(totalItems: number, currentPage: number, pageSize: number) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
  getPaginateData(page, compWisePagination): Observable<any> {
    if (compWisePagination == 'dealerComp') {

      return this.http.get<any>(baseUrl + '/car-dealers?page=' + page)

        .pipe(
          retryWhen(genericRetryStrategy()),
          catchError(this.handleError)
        );
    } else if (compWisePagination == 'usedCarComp') {
      return this.http.get<any>(baseUrl + '/used-car-ads?page=' + page)
        .pipe(
          retryWhen(genericRetryStrategy()),
          catchError(this.handleError)
        );
    }
    else if (compWisePagination == 'dealerSingleUsedCar') {
      return this.http.get<any>(baseUrl + '/car-dealer-single?page=' + page)
        .pipe(
          retryWhen(genericRetryStrategy()),
          catchError(this.handleError)
        );
    }
    // else if(compWisePagination == 'dealerComp'){

    // }

  }
  postPaginateData(page, compWisePagination, obj): Observable<any> {
    if (compWisePagination == 'dealerComp') {
      return this.http.post<any>(baseUrl + '/car-dealers?page=' + page, obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
          catchError(this.handleError)
        );
    } else if (compWisePagination == 'usedCarComp') {
      return this.http.post<any>(baseUrl + '/used-car-ads?page=' + page, obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
          catchError(this.handleError)
        );
    }
    else if (compWisePagination == 'dealerSingleUsedCar') {
      return this.http.post<any>(baseUrl + '/car-dealer-single?page=' + page, obj)
        .pipe(
          retryWhen(genericRetryStrategy()),
          catchError(this.handleError)
        );
    }
    // else if(compWisePagination == 'dealerComp'){

    // }

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
