import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Appearance,
  GermanAddress,
  Location,
} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { Product } from 'src/app/core/models/products.model';
import { Address } from 'src/app/core/models/Address.model';
import { CartService } from 'src/app/shared/services/Cart/cart.service';
import { Cart } from 'src/app/core/models/cart.model';
import { CheckoutService } from 'src/app/shared/services/Checkout/checkout.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent implements OnInit {

  @ViewChild('location') location: ElementRef;

  public latitude: number;
  public longitude: number;

  public zoom: number = 16;

  frmPlaceOrder: FormGroup;
  frmPayment: FormGroup;

  public selectedAddress: PlaceResult;
  public strSearchString: string = '';
  public selectedLocation: Location;
  public message: string;
  blnViewMap: boolean = false;
  submitted = false;
  strLandMark: string = '';

  public blnIsAvailability = true;
  geoCoder: any;
  toastService: any;

  arrProducts: any[] = [];
  objDeliveryAddress: Address;


  arrCart: any[] = [];
  cartSummary: any[] = [];
  shopDetails: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private spinner: NgxSpinnerService,
  ) { }

  data: any;

  propertyIcon = {
    url: 'assets/images/home.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  }

  ngOnInit(): void {
    this.frmPlaceOrder = this.formBuilder.group({
      txtName: ['', Validators.required],
      txtPhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(13), Validators.pattern('[- +()0-9]+')]],
      txtAddress: ['', Validators.required],
      txtSpecialNote: [''],

    })

    this.frmPayment = this.formBuilder.group({
      txtPaymentMode: ['']
    })

    let Cart: any = JSON.parse(localStorage.getItem("SMCart"));
    if (Cart && Cart.length) {
      this.arrCart = Cart
    } else {
      this.arrCart = []
    }

    let Shop = JSON.parse(localStorage.getItem("shopDetails"));
    if (Shop && Shop.length) {
      this.shopDetails = Shop
    } else {
      this.shopDetails = []
    }

    this.cartService.cartSummary.subscribe((res) => {
      this.cartSummary = res;
    })

    this.latitude = 25.2653598;
    this.longitude = 55.3240264;
  }

  get f() {
    return this.frmPlaceOrder.controls;
  }
  get payment() {
    return this.frmPayment.controls;
  }

  /**Map operations */

  onAutocompleteSelected(result: PlaceResult) {
    this.selectedAddress = result;

  }

  onLocationSelected(location: Location) {
    // console.log('onLocationSelected: ', location);
    this.zoom = 10;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.selectedLocation = location;
    this.blnViewMap = true;

    this.geoCoder = new google.maps.Geocoder()
  }

  markerDragEnd($event: MouseEvent) {
    let cords = JSON.stringify($event);
    let cords1 = JSON.parse(cords);
    this.latitude = cords1.latLng.lat;
    this.longitude = cords1.latLng.lng;

    this.geoCoder = new google.maps.Geocoder();
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: +latitude, lng: +longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.selectedAddress = results[0]
            this.selectedLocation = {
              "latitude": this.latitude,
              "longitude": this.longitude
            }
            this.location.nativeElement.value = results[0].formatted_address;
            this.strLandMark = results[0].formatted_address;
          } else {
            this.toastService.show("No results found", {
              classname: "bg-danger text-light",
              delay: 3000,
            });
          }
        } else {
          this.toastService.show("Geocoder failed due to:" + status, {
            classname: "bg-danger text-light",
            delay: 3000,
          });
        }
      }
    );
  }

  ClearLocation() {
    this.location.nativeElement.value = '';

  }

  checkInput(event) {
    this.blnIsAvailability = true;
  }


  onClickPlaceOrder() {
    this.submitted = true;
    if (this.frmPlaceOrder.invalid) {
      Swal.fire({
        title: "Warning",
        text: "Please fill the form properly!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (this.frmPayment.value.txtPaymentMode == '') {
      Swal.fire({
        title: "Warning",
        text: "Please select payment mode!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (this.cartSummary[0].strServiceMode == 'Delivery') {
      if (!this.location.nativeElement.value) {
        Swal.fire({
          title: "Warning",
          text: "Please select a location!",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        return;
      }
    }


    this.arrProducts = []
    let obj = {};
    this.arrCart.map((item: any) => {

      let variation = "";
      if (item.strVariation && item.strVariation != null) {
        variation = item.strVariation
      }
      obj = {
        strItemId: item.fkProductId,
        strQuantity: item.intQuantity,
        strTotalOneItem: parseFloat(item.arrayProductDetails[0].intSellingPrice + item.intPrice).toFixed(2),
        strTotalAmount: (parseFloat(item.arrayProductDetails[0].intSellingPrice + item.intPrice) * item.intQuantity).toFixed(2),
        blnCheck: false,
        strImagUrl: [
          {
            imageUrl: item.arrayProductDetails[0].arrayThumbnail[0].imageUrl,
            imageName: item.arrayProductDetails[0].arrayThumbnail[0].imageName,
          },
        ],
        strProductName: item.arrayProductDetails[0].strProductName,
        strProdArabicName: item.arrayProductDetails[0].strProdArabicName,
        strDescription: item.arrayProductDetails[0].strDescription,
        blnFrozen: item.arrayProductDetails[0].blnFrozenFood,
        blnCOD: '',
        blnCardOnDelivery: '',
        blnPayOnline: '',
        blnVeg: item.arrayProductDetails[0].blnVeg,
        blnStockAvailability: 'true',
        blnMorning: item.arrayProductDetails[0].blnMorning,
        blnAfterNoon: item.arrayProductDetails[0].blnAfterNoon,
        blnEvening: item.arrayProductDetails[0].blnEvening,
        blnNight: item.arrayProductDetails[0].blnNight,
        strPriceVariation: variation
      };
      this.arrProducts.push(obj);
      console.log(this.arrProducts)
      //}
    });

    if (this.cartSummary[0].intSubTotal.toFixed(2) <= 0) {
      Swal.fire({
        title: "Warning",
        text: "Minimum Order amount should be greater than zero",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;

    }
    //this.spinner.show();
    const objData = {
      arrayProductDetails: this.arrProducts,
      //strLoginUserID: localStorage.getItem('userId'),
      strStoreId: this.shopDetails[0].pkShopId,
      intDeliveryCharge: this.cartSummary[0].intDeliveryCharge,
      //intDistance: this.objDeliveryAddress.arrayStore[0].intDistance,
      strItemCount: this.arrCart.length,
      //strAddressId: this.objDeliveryAddress.pkAddressId,
      strCurrency: this.shopDetails[0].strCurrency,
      strTotalDiscountAmount: '',
      blnFrozen: 'false',
      strDeviceType: 'WEB',
      intServicePercentage: '0',
      intMinimumOrderAmount: '0',
      intServiceCharge: '',
      arrayUser: [
        {
          strUserName: this.frmPlaceOrder.value.txtName,
          strPhone: this.frmPlaceOrder.value.txtPhone,
        },
      ],
      arrayAddress: [{
        strAddress: this.frmPlaceOrder.value.txtAddress,
        strLongitude: this.longitude,
        strLatitude: this.latitude,
        strFullName: this.frmPlaceOrder.value.txtName,
        strCity: '',
        strMobileNumber: this.frmPlaceOrder.value.txtPhone,
        strAddressType: "",
        strHouseNumber: "",
        strLandMark: this.strLandMark,
        intDistance: ""
      }],
      storeInfo: {
        storeIconUrl: this.shopDetails[0].strIconUrl,
        storeName: this.shopDetails[0].strShopName,
        strShopArabicName: this.shopDetails[0].strShopArabicName,
      },
      shopDetails: this.shopDetails,
      strSubTotal: this.cartSummary[0].intSubTotal.toFixed(2),
      strGrandTotal: this.cartSummary[0].intGrandTotal.toFixed(2),
      intDiscount: this.cartSummary[0].intDiscount,
      intRewardPointsRedeemed: this.cartSummary[0].intRewardPointsRedeemed,
      fkPromocodeId: this.cartSummary[0].pkPromocodeId,
      arrayPromocodeDetals: this.cartSummary[0].couponDetails,
      strPaymentMode: this.frmPayment.value.txtPaymentMode,
      strServiceMode: this.cartSummary[0].strServiceMode,
      strDineIn: this.cartSummary[0].strDineIn,
      strDineInId: this.cartSummary[0].strDineInId,
      strSpecialNote: this.frmPlaceOrder.value.txtSpecialNote
    };
    this.spinner.show()
    console.log('Order place:::::::::::::::::::', objData);
    this.checkoutService.PlaceOrder(objData).subscribe((res) => {
      console.log('Order place:::::::::::::::::::', res);
      if (res.success) {
        this.spinner.hide();
        this.checkoutService.orderPlaceSuccess.next({
          isOrderSuccess: true,
          isOrderReviewSuccess: false,
          OrderDetails: res.data[0]
        })
        this.cartService.cartListing.next([])
        Swal.fire({
          title: "Success",
          text: "Order placed successfully!",
          icon: "success",
          confirmButtonText: "Ok",
        });
        this.checkoutService.orderSuccessComplete.next(true);
        localStorage.setItem("SMCart", JSON.stringify([]));
        this.cartService.cartSummary.next([])

        setTimeout(() => {
          this.router.navigate(['/order-success']);
        }, 1000);
      } else {
        this.spinner.hide();
        Swal.fire({
          title: "Error",
          text: res.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        //this.spinner.hide();
        //this.snackBarError(res.message);
      }
    });
  }


  onClickNavigateCart() {
    this.router.navigate(['/cart'])
  }

}
