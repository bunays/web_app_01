import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopListingService {

  shopDetails = new BehaviorSubject<any>({});

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getAllShops(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shop/get_available_shops',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
  getTopShopsService(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shop/Get_top_selling_shops',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getFeaturedVendors(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shop/featured-vendors',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
