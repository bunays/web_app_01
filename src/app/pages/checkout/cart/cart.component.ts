import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CouponModalComponent } from '../coupon-modal/coupon-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/shared/services/Cart/cart.service';
import { DineinService } from 'src/app/shared/services/Dinein/dinein.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  arrCart: any[] = [];
  arrayOfObjDineInList = [];
  intSubTotal: number = 0;
  intSubTotalWithoutVAT: number = 0;
  intCartItemCount: number = 0;
  intGrandTotal: number = 0;
  intDeliveryCharge: number = 0;
  strServiceMode: string = "";
  frmServiceMode: FormGroup;
  frmDineInInput: FormGroup;
  blnClicked: boolean = false;
  id: any;
  variant: any;
  objDineInName: string = "";
  objDineInId: string = "";

  private stepper: Stepper


  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private dineInService: DineinService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

    this.frmServiceMode = this.formBuilder.group({
      rdbServiceMode: ["", Validators.required]

    });

    this.frmDineInInput = this.formBuilder.group({
      rdbDepartment: ["", Validators.required]

    });

    let Cart: any = JSON.parse(localStorage.getItem("SMCart"));
    if (Cart && Cart.length) {
      this.arrCart = Cart
    } else {
      this.arrCart = []
    }
    this.intCartItemCount = this.arrCart.length;
    this.calculateCartTotal()
    this.getAllTables();
  }

  onChangeDineInItem(event) {
    console.log(event)
    this.objDineInId = event.target.value,
    this.objDineInName = this.arrayOfObjDineInList.find(
      (item) => item.pkDineInId === this.objDineInId).strName
  }

  getAllTables() {

    const obj = {
      strShopId: this.commonService.shopID
    }
    console.log("All tables obj",obj);

    this.dineInService.dineIn(obj).subscribe((res) => {
      if(res.success) {
        this.arrayOfObjDineInList = res.data;
      }
      else {
        this.arrayOfObjDineInList = [];
      }
    });
  }
 

  clearCartItem(id, variation) {

    let index = this.arrCart.findIndex(x =>
      x.fkProductId === id &&
      x.strVariation === variation
    )
    this.arrCart.splice(index, 1);
    localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
    this.calculateCartTotal();

  }

  // onClickClearCart() {
  //   this.arrCart.length = 0;
  // }

  incrementCart(id: any, variation: any) {

    let cartItemExist = this.arrCart.find((cartItem) =>
      cartItem.fkProductId === id &&
      cartItem.strVariation === variation
    )
    if (cartItemExist) {
      cartItemExist.intQuantity = cartItemExist.intQuantity + 1;

      let index = this.arrCart.findIndex(x =>
        x.fkProductId === id &&
        x.strVariation === variation);
      console.log(index);
      if (index > -1) {
        this.arrCart[index] = cartItemExist;
        localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
        this.calculateCartTotal();
      } else {
        return;
      }
    }

  }

  decrementCart(id: any, variation: any) {

    let cartItemExist = this.arrCart.find((cartItem) =>
      cartItem.fkProductId === id &&
      cartItem.strVariation === variation
    )
    if (cartItemExist) {
      if (cartItemExist.intQuantity == 1) {

        this.clearCartItem(id, variation)

      } else {

        cartItemExist.intQuantity = cartItemExist.intQuantity - 1;

        let index = this.arrCart.findIndex(x =>
          x.fkProductId === id &&
          x.strVariation === variation);
        console.log(index);
        if (index > -1) {

          this.arrCart[index] = cartItemExist;
          localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
          this.calculateCartTotal();
        } else {
          return;
        }

      }

    }

  }

  onSelectServiceMode() {
    console.log("clicked")
    this.calculateCartTotal();
  }

  calculateCartTotal() {

    this.intSubTotal = this.arrCart.reduce((sum, value) => {
      return sum + (value.arrayProductDetails[0].intSellingPrice + value.intPrice) * value.intQuantity;
    }, 0);

    this.intCartItemCount = this.arrCart.length;
    this.intSubTotalWithoutVAT = (this.intSubTotal / (1 + ( 5 / 100)));
    this.intDeliveryCharge = 0;
    if (this.intSubTotal < 250) {
      if (this.frmServiceMode.value.rdbServiceMode == 'Delivery') {
        this.intDeliveryCharge = 10;
      }
    }
    this.intGrandTotal = this.intSubTotal + this.intDeliveryCharge;

  }

  resetCart() {
    this.arrCart = [];
    localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
    this.intCartItemCount = 0;
    this.intSubTotalWithoutVAT = 0;
    this.intGrandTotal = 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CouponModalComponent, {
      width: '305px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openOrderSummary(summary) {
    this.modalService.open(summary, { centered: true });
  }

  onClickNavigateOrderSummary() {
    if (this.frmServiceMode.invalid) {
      Swal.fire({
        title: "Warning",
        text: "Please select a service mode!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (this.frmServiceMode.value.rdbServiceMode == 'DineIn') {
      if (this.frmDineInInput.invalid) {
        Swal.fire({
          title: "Warning",
          text: "Please select a table under the dine-in!",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return;
      }
    }

    if (this.frmServiceMode.value.rdbServiceMode == 'Delivery' && this.intSubTotal < 250) {
      this.intDeliveryCharge = 10;
    }


    let arrCartTotal = [
      {
        strServiceMode: this.frmServiceMode.value.rdbServiceMode,
        strDineIn: this.objDineInName,
        strDineInId: this.objDineInId,
        intSubTotal: this.intSubTotal,
        intDeliveryCharge: this.intDeliveryCharge,
        intGrandTotal: this.intGrandTotal,
        pkPromocodeId: "",
        couponDetails: [],
        intRewardPointsRedeemed: 0,
        intDiscount: 0
      }
    ]
    this.cartService.cartSummary.next(arrCartTotal);
    this.router.navigate(['/order-summary'])
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
