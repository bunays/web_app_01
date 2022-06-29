import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/ApiResponse';
import { CommonService } from '../common/common.service';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialAuthService} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService,
    private socialAuthService: SocialAuthService
  ) { }


  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  getLoginOTP(obj) {

    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/user/login_send_otp',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getLoginVerifyOTP(obj) {

    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/user/login_verify_otp',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getSignUpOTP(obj) {
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/user/add_user_send_otp',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getSignUpOTPVerify(obj) {
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/user/add_user_verify_otp',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  authSocialLogin(obj){
    return this.httpClient
      .post<ApiResponse>(
        this.commonService.apiURL + '/api/user/social-media-authentication',
        obj,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));

  }


  getloggedOut() {
    this.socialAuthService.signOut();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("selectedServiceAddress")
    window.location.reload();
    
  }
}
