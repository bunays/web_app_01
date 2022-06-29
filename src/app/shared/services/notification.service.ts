import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from './common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationCount = new BehaviorSubject(0);

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getAllNotifications(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/notifications/GetAllNotifications',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  deleteAllNotifications(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/notifications/deleteAllNotifications',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }

  NotificationCount(obj) {
    return this.httpClient
    .post<ApiResponse>(
      this.commonService.apiURL + '/api/notifications/GetNotificationCount',
      obj,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.commonService.handleError));
  }
}
