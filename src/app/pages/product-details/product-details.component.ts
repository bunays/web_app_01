import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BannerService } from 'src/app/shared/services/Banner/banner.service';
import { ProductsService } from 'src/app/shared/services/Products/products.service';
import { SearchService } from 'src/app/shared/services/Search/search.service';
import { ToggleService } from 'src/app/shared/services/Toggle/toggle.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Product } from 'src/app/core/models/products.model';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('buttonTextStateTrigger', [
      state('shown', style({
        opacity: 1
      })),
      state('transitioning', style({
        opacity: 0.3
      })),
      transition('shown => transitioning', animate('300ms ease-out')),
      transition('transitioning => shown', animate('300ms ease-in'))
    ])
  ]

})
export class ProductDetailsComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.drawer.close();
  }

  searchResult: boolean = false;
  intCartItemCount: number = 0;
  arrCart: any[] = [];

  arrProducts: Product[] = [];
  searchString: string;

  @ViewChild('searchTags', { static: false }) searchTag: ElementRef;

  arrayOfBottomBannerImages: any = [];
  objProductDetails: any = [];
  objProductCopy: any = [];
  intSubTotal: number = 0;
  intItemCount: number = 0;
  strProductId: string = '';
  arrItemCount: any[] = [];
  objVariationItemCount: any = {}

  constructor(
    private toggleService: ToggleService,
    private bannerService: BannerService,
    private modalService: NgbModal,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private searchService: SearchService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        (this.strProductId = params.id)
      });

    let Cart: any = JSON.parse(localStorage.getItem("SMCart"));
    if (Cart && Cart.length) {
      this.arrCart = Cart
    } else {
      this.arrCart = []
    }


    //this.findItemCount();
    this.intCartItemCount = this.arrCart.length;
    this.calculateCartTotal();
    this.getProductDetails();
    this.getAllBottomBannerImages();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  ngAfterViewInit() {
    fromEvent(this.searchTag.nativeElement, 'keyup')
      .pipe(map(() => this.searchTag.nativeElement.value), debounceTime(800), distinctUntilChanged())
      .subscribe((value) => {

        // console.log('Response::::::', value);
        this.searchMethod(value);
      });
  }

  searchMethod(value: string) {
    const obj = {
      strSearchTag: value,
      strSkipCount: '',
      strPageLimit: '',
      fkShopId: this.commonService.shopID,
      strShopId: this.commonService.shopID
    }

    this.searchService.getAllSearchResults(obj).subscribe((res) => {
      if (res.success) {
        this.searchResult = true;
        this.arrProducts = res.data;
      }
      else {
        this.arrProducts = [];
        this.searchResult = false;
      }

      // if (this.arrProducts.length == 0) {
      //   if (this.searchString.length) {
      //     this.searchResult = true
      //   } else {
      //     this.searchResult = true
      //   }
      // }
      console.log('Search Response:::::::', this.arrProducts);
    })
  }


  // Slick slider config
  public bannerSlideConfig: any = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  getAllBottomBannerImages() {
    const obj = {
      strDeviceType: "WEB",
    };
    this.productsService.getProductDetails(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Banner Images::::::::::::::", res);
        if (res.success) {
          this.arrayOfBottomBannerImages = res.data;
        } else {
          this.arrayOfBottomBannerImages = []
        }

      }
    });
  }


  getProductDetails() {
    this.spinner.show();
    const obj = {
      strProductId: this.strProductId
    };
    console.log('Obj res:::', obj);
    this.productsService.getProductDetails(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Product Details::::::::::::::", res);
        if (res.success) {
          this.spinner.hide();
          this.objProductDetails = res.data;
          //this.objProductCopy = res.data
          if (this.objProductDetails[0].arrayAddOnPriceDetails.length) {
            this.objProductDetails[0].arrayAddOnPriceDetails.forEach(element => {
              this.objVariationItemCount[element.size] = 0
            });
          }

          this.findItemCount();
          //let objAddOnProductDetails: any = this.objProductDetails[0].arrayAddOnPriceDetails
          //console.log(objAddOnProductDetails);
        } else {
          this.spinner.hide();
          this.objProductDetails = []
        }

      }
    });
  }

  findItemCount() {
    if ((this.objProductDetails[0].blnPriceVariation == 'false' || this.objProductDetails[0].blnPriceVariation == false)) {
      let objItem = this.arrCart.find(
        (value) => value.fkProductId === this.objProductDetails[0].pkShopProductId
      )
      if (objItem) {
        this.intItemCount = objItem.intQuantity;
      } else {
        this.intItemCount = 0;
      }
    }
    else if ((this.objProductDetails[0].blnPriceVariation == 'true' || this.objProductDetails[0].blnPriceVariation == true)) {
      let i: any;
      for (i = 0; i < this.objProductDetails[0].arrayAddOnPriceDetails.length; i++) {
        let objItem = this.arrCart.find(
          (value) => value.fkProductId === this.objProductDetails[0].pkShopProductId && value.strVariation === this.objProductDetails[0].arrayAddOnPriceDetails[i].size
        )
        if (objItem) {
          this.objVariationItemCount[this.objProductDetails[0].arrayAddOnPriceDetails[i].size] = objItem.intQuantity
        } else {
          this.objVariationItemCount[this.objProductDetails[0].arrayAddOnPriceDetails[i].size] = 0;
        }

      }
    }

    console.log(this.intItemCount)
    console.log(this.objVariationItemCount)
  }

  addToCartFn(price: any, variation: any) {

    let objCart = {
      pkCartId: "",
      fkProductId: this.objProductDetails[0].pkShopProductId,
      fkUserID: "",
      intQuantity: 1,
      strVariation: variation,
      intPrice: price,
      arrayProductDetails: [{
        strProductName: this.objProductDetails[0].strProductName,
        strDescription: this.objProductDetails[0].strDescription,
        strBarcode: this.objProductDetails[0].strBarcode,
        strProductType: this.objProductDetails[0].strProductType,
        arrayThumbnail: this.objProductDetails[0].arrayThumbnail,
        blnFrozenFood: this.objProductDetails[0].blnFrozenFood,
        intMRP: this.objProductDetails[0].intMRP,
        intSellingPrice: this.objProductDetails[0].intSellingPrice,
        intDiscount: this.objProductDetails[0].intDiscount,
        blnMorning: this.objProductDetails[0].blnMorning,
        blnAfterNoon: this.objProductDetails[0].blnAfterNoon,
        blnEvening: this.objProductDetails[0].blnEvening,
        blnNight: this.objProductDetails[0].blnNight,
        blnBestSeller: this.objProductDetails[0].blnBestSeller,
        blnVeg: this.objProductDetails[0].blnVeg,
        strProdArabicName: this.objProductDetails[0].strProdArabicName,
        blnPriceVariation: this.objProductDetails[0].blnPriceVariation,
        arrayAddOnPriceDetails: this.objProductDetails[0].arrayAddOnPriceDetails,
      }]
    }

    let cartItemExist = this.arrCart.find((cartItem) =>
      cartItem.fkProductId === this.objProductDetails[0].pkShopProductId &&
      cartItem.strVariation === variation &&
      cartItem.intPrice === price
    )

    console.log(cartItemExist)
    if (cartItemExist) {
      cartItemExist.intQuantity = cartItemExist.intQuantity + 1;

      let index = this.arrCart.findIndex(x =>
        x.fkProductId === this.objProductDetails[0].pkShopProductId &&
        x.strVariation === variation &&
        x.intPrice === price);
      console.log(index);
      this.snackBarSuccess(`Product added to cart successfully`);
      if (index > -1) {
        this.arrCart[index] = cartItemExist;
        localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
        this.findItemCount();
        this.calculateCartTotal();
      } else {
        this.snackBarError(`Product added to cart failed`);
        return;
      }
    } else {
      this.snackBarSuccess(`Product added to cart successfully`);
      this.arrCart.push(objCart);
      localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
      this.findItemCount();
      this.calculateCartTotal();
    }
  }

  decrementCartFn(price: any, variation: any) {
    let objCart = {
      pkCartId: "",
      fkProductId: this.objProductDetails[0].pkShopProductId,
      fkUserID: "",
      intQuantity: 0,
      strVariation: variation,
      intPrice: price,
      arrayProductDetails: [{
        strProductName: this.objProductDetails[0].strProductName,
        strDescription: this.objProductDetails[0].strDescription,
        strBarcode: this.objProductDetails[0].strBarcode,
        strProductType: this.objProductDetails[0].strProductType,
        arrayThumbnail: this.objProductDetails[0].arrayThumbnail,
        blnFrozenFood: this.objProductDetails[0].blnFrozenFood,
        intMRP: this.objProductDetails[0].intMRP,
        intSellingPrice: this.objProductDetails[0].intSellingPrice,
        intDiscount: this.objProductDetails[0].intDiscount,
        blnMorning: this.objProductDetails[0].blnMorning,
        blnAfterNoon: this.objProductDetails[0].blnAfterNoon,
        blnEvening: this.objProductDetails[0].blnEvening,
        blnNight: this.objProductDetails[0].blnNight,
        blnBestSeller: this.objProductDetails[0].blnBestSeller,
        blnVeg: this.objProductDetails[0].blnVeg,
        strProdArabicName: this.objProductDetails[0].strProdArabicName,
        blnPriceVariation: this.objProductDetails[0].blnPriceVariation,
        arrayAddOnPriceDetails: this.objProductDetails[0].arrayAddOnPriceDetails,
      }]
    }

    let cartItemExist = this.arrCart.find((cartItem) =>
      cartItem.fkProductId === this.objProductDetails[0].pkShopProductId &&
      cartItem.strVariation === variation &&
      cartItem.intPrice === price
    )

    console.log(cartItemExist)
    if (cartItemExist) {
      if(cartItemExist.intQuantity == 1) {
        this.clearCartItem(price, variation)
      } else {
        cartItemExist.intQuantity = cartItemExist.intQuantity - 1;

        let index = this.arrCart.findIndex(x =>
          x.fkProductId === this.objProductDetails[0].pkShopProductId &&
          x.strVariation === variation &&
          x.intPrice === price);
        console.log(index);
        this.snackBarSuccess(`Product removed from cart successfully`);
        if (index > -1) {
          this.arrCart[index] = cartItemExist;
          localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
          this.findItemCount();
          this.calculateCartTotal();
        } else {
          this.snackBarError(`Product removed from cart failed`);
          return;
        }
      }

    } else {
      this.snackBarSuccess(`Product removed from cart successfully`);
      this.arrCart.push(objCart);
      localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
      this.findItemCount();
      this.calculateCartTotal();
    }
  }

  clearCartItem(price, variation) {

    let index = this.arrCart.findIndex(x =>
      x.fkProductId ===this.objProductDetails[0].pkShopProductId &&
      x.strVariation === variation &&
      x.intPrice === price
    )
    this.snackBarSuccess(`Product removed from cart successfully`);
    this.arrCart.splice(index, 1);
    localStorage.setItem("SMCart", JSON.stringify(this.arrCart))
    this.findItemCount();
    this.calculateCartTotal();

  }

  calculateCartTotal() {

    this.intSubTotal = this.arrCart.reduce((sum, value) => {
      return sum + (value.arrayProductDetails[0].intSellingPrice + value.intPrice) * value.intQuantity;
    }, 0);

    this.intCartItemCount = this.arrCart.length;
  }


  onClickNavigateCart() {
    this.router.navigate(['/cart'])
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
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





}
