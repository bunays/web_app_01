import { catchError, retry } from 'rxjs/operators';
import { ApiResponse } from './../../../core/models/ApiResponse';
import { CommonService } from './../common/common.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  claimCoupon(obj){
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/promocode/claim_promo_code',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));

  }
}
