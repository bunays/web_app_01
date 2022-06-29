import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderListing } from 'src/app/core/models/orders.model';
import { Product } from 'src/app/core/models/products.model';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MyOrdersService } from 'src/app/shared/services/My-orders/my-orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [NgxSpinnerService]
})
export class MyOrdersComponent implements OnInit {

  frmPhoneNumber: FormGroup;

  submitted = false;
  objUserId: any;
  arrMyOrders: OrderListing[] = [];
  arrRecommendedItems: Product[] = [];
  lastOrderId: string = '';
  blnLogin: boolean = false;
  blnEmptyOrders: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private myOrdersService: MyOrdersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.frmPhoneNumber = this.formBuilder.group({
      txtPhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13), Validators.pattern('[- +()0-9]+')]],
    })
  }

  get f() {
    return this.frmPhoneNumber.controls;
  }

  public recommendedItemsConfig: any = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 641,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };


  onClickSubmit() {

    this.submitted = true;
    if (this.frmPhoneNumber.invalid) {
      return;
    }
    const obj = {
      strPhone: this.frmPhoneNumber.value.txtPhone.toString()
    }
    console.log('object response', obj);
    this.myOrdersService.getUserDetails(obj).subscribe((res) => {
      console.log('User Response::::::', res);
      if (res.success) {
        this.objUserId = res.data[0].pkUserId;
        localStorage.setItem('userID',(this.objUserId))
        localStorage.setItem('Phone', res.data[0].strPhone)
        this.blnLogin = true;
        this.getMyOrderDetails();
        this.snackBarSuccess(`${res.message}`);
      }
      else {
        this.blnLogin = false;
        this.snackBarError(`${res.message}`);
      }
    });
  }

  getMyOrderDetails() {
    this.spinner.show();
    const obj = {
      strLoginUserID: localStorage.getItem('userID'),
      strShopId: this.commonService.shopID,
      strPageLimit: 1000,
      strSkipCount: 0
    }
    console.log('object response', obj);
    this.myOrdersService.getOrderService(obj).subscribe((res) => {
      console.log('Order Response::::::', res);
      if(res.success) {
        this.arrMyOrders = res.data;
        this.lastOrderId = res.data[0].strOrderID
        this.spinner.hide();
        if(this.arrMyOrders.length) {
          this.getRecommendedItems();
        } else {
          return;
        }
      }
      else {
        this.blnEmptyOrders = true;
        this.arrMyOrders = [];
        this.spinner.hide();
      }
    });

  }

  getRecommendedItems() {
    
    const obj = {
      strLoginUserId: localStorage.getItem('userID'),
      strLastOrderId: this.lastOrderId,
    }
    console.log('Recommended Items Object', obj);
    this.myOrdersService.getRecommendedItems(obj).subscribe((res) => {
      console.log('Recommended Items Response::::::', res);
      if(res.success) {
        this.arrRecommendedItems = res.data;
      }
      else {
        this.arrRecommendedItems = [];
      }
    });
  }

  onClickOrderDetails(item) {
    this.router.navigate(['/order-details'],{
      queryParams: {id: item.strOrderID}
    });
  }

  onClickProductDetails(product) {
    this.router.navigate(['/product-details'], {
      queryParams: {id: product.pkShopProductId}
    })
  }

  snackBarSuccess(message: string) {
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      panelClass: ['notif-success'],
    });
  }
  snackBarError(message: string) {
    this.snackBar.open(`${message}`, '', {
      duration: 3000,
      panelClass: ['notif-error'],
    });
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }
  // snackbarSuccess() {
  //   this.snackBar.open('Phone number submitted successfully', '', {
  //     duration: 4000,
  //     panelClass: ['notif-success']
  //   });
  // }

  // snackBarError() {
  //   this.snackBar.open('Phone number submission failed!', '', {
  //     duration: 3000,
  //     panelClass: ['notif-error'],
  //   });
  // }

}
