import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      /*Authorization: 'bearer' + ' ' + localStorage.getItem('token'),*/
    }),
  };

  updateProfileDetails(obj) {
    return this.httpClient.
      post<ApiResponse>(
        this.commonService.apiURL + "/api/user/update_user_profile",
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getSavedAddresses(obj) {
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + "/api/address/get_address",
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  updateAddress(obj) {
    // console.log(obj);
    return this.httpClient.post<ApiResponse>(
      this.commonService.apiURL + "/api/address/update_address",
      obj,
      this.httpOptions
    ).pipe(retry(1), catchError(this.commonService.handleError));

  }

  deleteSavedAddress(obj) {
    // console.log(obj)
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + "/api/address/delete_address",
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getProfileDetails(obj){
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/user/get-profile-details',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));

  }

}
