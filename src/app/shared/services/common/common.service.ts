import { environment } from '../../../../environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  gMapAddress = new BehaviorSubject<any>({});

  public apiURL: string = environment.API_ENDPOINT;
  //public apiURL1: string = environment.ENDPOINT1;
  public shopID: string = environment.SHOP_ID;

  constructor() { }


  handleError(error) {

    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
