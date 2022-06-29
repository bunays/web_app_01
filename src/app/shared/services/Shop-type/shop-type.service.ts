import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopTypeService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getAllShopTypes() {
    return this.httpClient
    .get<ApiResponse>(
      this.commonService.apiURL + '/api/shopType/get_shop_types',
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getOneShopType(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shopType/get_shop_type_by_id',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getAllShopTypesWithCategories(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/shopType/get_shop_types_with_category',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

}
