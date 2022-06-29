import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };



  addToWishListService(obj) {

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
      }),
    };
    
    // console.log(this.httpOptions)
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/wishlist/AddToWishList',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  addToWishListFromCartService(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/cart/AddToWishlistCart',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  removeFromWishListService(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/wishlist/DeleteWishlist',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getWishListDetailsService(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/wishlist/GetWishlistDetails',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
