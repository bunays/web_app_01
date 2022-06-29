import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiCartResponse } from 'src/app/core/models/ApiCartResponse.model';
import { Cart } from './../../../core/models/cart.model';
import { BehaviorSubject, ReplaySubject, Subject, concat, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartTotal$ = new ReplaySubject<number>();
  cartListing = new BehaviorSubject<Cart[]>([]);
  cartCount = new BehaviorSubject(0);
  cartSummary = new BehaviorSubject<any[]>([]);


  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };


  GetAllProductsInCart(obj) {
    return this.httpClient
    .post<ApiCartResponse>(
      this.commonService.apiURL + '/api/cart/GetCartDetails',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));

  }

  AddToCart(obj) {
        return this.httpClient
        .post<ApiResponse>(
          this.commonService.apiURL + '/api/cart/AddToCart',
          obj,
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.commonService.handleError));

  }


  ClearCart(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/cart/EmptyCart',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  UpdateCart(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/cart/UpdateCart',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  DeleteItemFromCart(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/cart/DeleteCart',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getCartCount(objData){
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/cart/GetCartCount',
      objData,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));

  }

  getTotalRewardPoints(obj){
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/rewards/get-reward-points',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));

  }
}
