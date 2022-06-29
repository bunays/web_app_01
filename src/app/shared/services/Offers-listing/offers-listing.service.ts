import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersListingService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getTopOffer(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shop/get_top_offer_topBar',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getTopOfferStores(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shop/get_top_offer_stores',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllOfferImages(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/images/GetAllOfferImages',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getTopOfferProducts(obj){
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/product/top-offer-products',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
