import { Address } from './../../../core/models/Address.model';
import { CommonService } from './../common/common.service';
import { ApiResponse } from './../../../core/models/ApiResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from "rxjs/operators";
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  // to get the selected address
  selectedAddressForDelivery$ = new BehaviorSubject<Address>({});

  selectedAddressForPickup$ = new BehaviorSubject<Address>({});
  selectedAddressForDrop$ = new BehaviorSubject<Address>({});

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getCheckAddressAvailability(obj) {

    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/address/check_delivery_availability',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllSavedAddress(obj) {
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + "/api/address/get_address",
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAddAddress(obj) {
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + "/api/address/add_address",
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

}