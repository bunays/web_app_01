import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/shared/services/Toggle/toggle.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from 'src/app/shared/services/Banner/banner.service';
import { ProductsService } from 'src/app/shared/services/Products/products.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  arrayOfBottomBannerImages: any = [];
  arrayOfProducts: any = [];

  constructor(
    private toggleService: ToggleService,
    private modalService: NgbModal,
    private bannerService: BannerService,
    private productsService: ProductsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAllBottomBannerImages();
    this.getAllItems();
  }

  // openProductDetails(details) {
  //   this.modalService.open(details, { centered: true });
  // }

  // openCartDetails(cart) {
  //   this.modalService.open(cart, { centered: true });
  // }

  // onClickOpenProductDetailsSideNav() {
  //   this.toggleService.leftSideNav.next({
  //     type: 'ProductDetails',
  //     isVisible: true
  //   })
  // }

  onClickNavigate(product) {
    this.router.navigate(['/product-details'], {
      queryParams: {id: product.pkShopProductId}
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
    this.bannerService.getAllBottomBanner(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Banner Images::::::::::::::", res);
        if(res.data && res.data.length){
          this.arrayOfBottomBannerImages = res.data[0].arrayTopSlidingImages;
        }else{
          this.arrayOfBottomBannerImages = []
        }
      
      }
    });
  }

  getAllItems() {
    this.spinner.show();
    const obj = {
      blnVeg: "",
      strSubCategoryId: "",
      strShopId:this.commonService.shopID,
      intSkipCount: 0,
      intPageLimit: 1000
    };
    this.productsService.getAllProducts(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("All Items::::::::::::::", res);
        if (res.success) {
          this.spinner.hide();
          this.arrayOfProducts = res.data[0].Products;
          let shopDetails = res.data[0].shopDetails;

          if(shopDetails && shopDetails.length){
            localStorage.setItem("shopDetails", JSON.stringify(shopDetails));
          }else{
            localStorage.setItem('shopDetails',JSON.stringify([]))
          }
        
        } else {
          this.spinner.hide();
          this.arrayOfProducts = []
        }

      }
    });
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
