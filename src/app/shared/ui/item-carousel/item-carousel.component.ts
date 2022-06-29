import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from '../../services/Banner/banner.service';
import { CategoryListingService } from '../../services/Category-listing/category-listing.service';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-item-carousel',
  templateUrl: './item-carousel.component.html',
  styleUrls: ['./item-carousel.component.scss']
})
export class ItemCarouselComponent implements OnInit {

  arrayOfBottomBannerImages: any = [];
  arrCategories: any[] = [];

  constructor(
    private bannerService: BannerService,
    private categoryService: CategoryListingService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getCategoryListing();
    // this.getAllBottomBannerImages();
  }

  // Slick slider config
  public bannerSlideConfig: any = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  getCategoryListing() {
    let obj = {
      strShopId: this.commonService.shopID,
      intPageLimit: 1000,
      intSkipCount:0
    }
    this.categoryService.CategoryList(obj).subscribe((res) => {
      console.log("Item Images::::::::::::::", res);
      if (res.success) {
        this.arrCategories = res.data;
      } else {
        this.arrCategories = [];
      }
    })
  }

  onClickCategory(category) {
    this.router.navigate(['/sub-categories'], {
      queryParams: { catId: category.pkCategoryId}
    });
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

  // getAllBottomBannerImages() {
  //   const obj = {
  //     strDeviceType: "WEB",
  //   };
  //   this.bannerService.getAllBottomBanner(obj).subscribe((res) => {
  //     if (res.success === true) {
  //       console.log("Banner Images::::::::::::::", res);
  //       if(res.data && res.data.length){
  //         this.arrayOfBottomBannerImages = res.data[0].arrayTopSlidingImages;
  //       }else{
  //         this.arrayOfBottomBannerImages = []
  //       }

  //     }
  //   });
  // }

}
