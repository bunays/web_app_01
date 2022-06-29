import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getAllSearchResults(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/search/GetSearchResults',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getSearchProduct(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/product/get_all_product_search',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
