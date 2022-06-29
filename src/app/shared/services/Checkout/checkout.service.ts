import { catchError, retry } from 'rxjs/operators';
import { ApiResponse } from './../../../core/models/ApiResponse';
import { CommonService } from './../common/common.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface OrderPlaceSuccess {
  isOrderSuccess?: boolean;
  isOrderReviewSuccess?: boolean;
  OrderDetails?: any;
}

export interface ServiceOrderPlaceSuccess {
  isServiceOrderSuccess?: boolean;
  isServiceOrderReviewSuccess?: boolean;
  ServiceOrderDetails?: any;
}

export interface OrderPlace {
  isAddressSelected: boolean;
  isPaymentSelected: boolean;
}

const initialState = {
  isOrderSuccess: false,
  isOrderReviewSuccess: false,
  isServiceOrderSuccess: false,
  isServiceOrderReviewSuccess: false,
  OrderDetails: {},
  ServiceOrderDetails: {}
}

const orderPlaceState = {
  isAddressSelected: false,
  isPaymentSelected: true
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderPlaceSuccess = new BehaviorSubject<OrderPlaceSuccess>(initialState);
  serviceOrderPlaceSuccess = new BehaviorSubject<ServiceOrderPlaceSuccess>(initialState);
  orderPlace = new BehaviorSubject<OrderPlace>(orderPlaceState);
  orderSuccessComplete = new BehaviorSubject<boolean>(false);
  serviceOrderSuccessComplete = new BehaviorSubject<boolean>(false);


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
}
