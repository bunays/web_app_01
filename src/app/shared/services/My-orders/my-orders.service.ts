import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiOrderDetailsResponse } from 'src/app/core/models/ApiOrderDetailsResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  OrderDetails(obj) {
    return this.httpClient
    .post<ApiOrderDetailsResponse>(
      this.commonService.apiURL + '/api/order/OrderDetails',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  CancelOrder(obj) {
    return this.httpClient
    .post<ApiOrderDetailsResponse>(
      this.commonService.apiURL + '/api/order/OrderCancel',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getTransactionService(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/rewards/get-all-rewards',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getOrderService(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/order/GetOrderUser',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getUserDetails(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/user/get-user-by-phone',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getRecommendedItems(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/order/recommended-items-under-order',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

}
