import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  // getAllBanner(obj) {
  //   return this.httpClient
  //   .post<ApiResponse>(
  //     this.commonService.apiURL + '/api/images/GetAllBannerImages',
  //     obj,
  //     this.httpOptions
  //   )
  //   .pipe(retry(1), catchError(this.commonService.handleError));
  // }

  getAllBanner(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/images/Header-Banner-Images',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllBottomBanner(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/images/GetAllOfferImages',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllBannerImages(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/images/GetAllBannerImages',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
  getServiceBanner() {
    return this.httpClient
      .get<ApiResponse>(
        this.commonService.apiURL + "/api/service-banners/get-service-banner",
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  
  getAllMiddleBannerImages(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/middle-banners/GetAllMiddleBannerImages',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllOfferImages(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/web-header-banners/get-all-banners-customer',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

}
