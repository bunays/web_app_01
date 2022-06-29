import { CheckoutService } from './../../../shared/services/Checkout/checkout.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderSuccessService implements CanActivate {

  blnOrderSuccessComplete = false;


  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) { }


  canActivate() {
    this.checkoutService.orderSuccessComplete.subscribe((res) => {
      this.blnOrderSuccessComplete = res
      // console.log(res)
    })

    if (this.blnOrderSuccessComplete) {
      return true;
    } else {
      this.router.navigate(['/'])
      return false;

    }
  }
}
