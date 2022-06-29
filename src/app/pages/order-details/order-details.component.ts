import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyOrdersService } from 'src/app/shared/services/My-orders/my-orders.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [NgxSpinnerService]
})
export class OrderDetailsComponent implements OnInit {

  OrderId: string = "";
  objOrderDetails: any;
  objAddressDetails: any;

  constructor(
    private myOrderService: MyOrdersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.OrderId = params.id;
    })
    this.orderDetails(this.OrderId);
  }

  orderDetails(strorderId: string) {
    this.spinner.show();
    const obj = {
      strLoginUserID: localStorage.getItem('userID'),
      strOrderID: strorderId
    };
    this.myOrderService.OrderDetails(obj).subscribe((res) => {
      console.log('Order Details Response:::::::', res);
      this.objOrderDetails = res.data[0];
      this.objAddressDetails = res.data[0].arrayAddress
      this.spinner.hide();
    })

  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
