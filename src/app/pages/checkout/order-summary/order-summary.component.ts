import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/shared/services/Cart/cart.service';
import { CouponModalComponent } from '../coupon-modal/coupon-modal.component';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  arrCart:any[]=[];
  cartSummary:any[]=[];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cartService:CartService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    let Cart: any = JSON.parse(localStorage.getItem("SMCart"));
    if (Cart && Cart.length) {
      this.arrCart = Cart
    } else {
      this.arrCart = []
    }

    this.cartService.cartSummary.subscribe((res) => {
      this.cartSummary = res;
    })

    console.log(this.arrCart)
    console.log(this.cartSummary)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CouponModalComponent, {
      width: '305px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openCartDetails(cart) {
    this.modalService.open(cart, { centered: true });
  }

  openOrderPlace(orderPlace) {
    this.modalService.open(orderPlace, { centered: true });
  }

  onClickNavigateCart() {
    this.router.navigate(['/cart'])
  }

  onClickNavigatePlaceOrder() {
    this.router.navigate(['/order-confirm'])
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
