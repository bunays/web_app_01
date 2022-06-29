import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  PlaceOrder(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/order/PlaceOrder',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getCurrentOrder(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/order/get_order_oncoming',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  CancelCurrentOrder(obj) {
    return this.httpClient
    .post<ApiResponse>(
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
  
}
