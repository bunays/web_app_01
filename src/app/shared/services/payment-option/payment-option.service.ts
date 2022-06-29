import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionService {

  paymentOption: BehaviorSubject<any> = new BehaviorSubject('Card On Delivery');
  constructor() { }
}
