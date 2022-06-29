import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from 'src/app/shared/services/Banner/banner.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { PopularService } from 'src/app/shared/services/popular.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  arrayOfBottomBannerImages: any = [];
  arrayOfPopularItems: any = [];

  constructor(
    private modalService: NgbModal,
    private bannerService: BannerService,
    private popularService: PopularService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBottomBannerImages();
    this.getAllPopularItems();
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

  onClickNavigate(product) {
    this.router.navigate(['/product-details'], {
      queryParams: {id: product.pkShopProductId}
    })
  }


  getAllBottomBannerImages() {
    const obj = {
      strDeviceType: "WEB",
    };
    this.bannerService.getAllBottomBanner(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Banner Images::::::::::::::", res);
        if (res.data && res.data.length) {
          this.arrayOfBottomBannerImages = res.data[0].arrayTopSlidingImages;
        } else {
          this.arrayOfBottomBannerImages = []
        }

      }
    });
  }

  getAllPopularItems() {
    const obj = {
      strShopId:this.commonService.shopID,
      intSkipCount: 0,
      intPageLimit: 1000
    };
    this.popularService.PopularList(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Popular Items::::::::::::::", res);
        if (res.success) {
          this.arrayOfPopularItems = res.data;
        } else {
          this.arrayOfPopularItems = []
        }

      }
    });
  }


  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
