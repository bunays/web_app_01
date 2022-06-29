import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getSellerOTP(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/signup/verify-mobile',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getSellerVerifyOTP(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/signup/verify-otp',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  addSellerRegister(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/store/add-shop',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
