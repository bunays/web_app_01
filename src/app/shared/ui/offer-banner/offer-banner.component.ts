import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../services/Banner/banner.service';
import { ShopTypeService } from 'src/app/shared/services/Shop-type/shop-type.service';
import { ShopType } from 'src/app/core/models/Shoptype.model';
import { ShopListingService } from 'src/app/shared/services/Shop-listing/shop-listing.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-offer-banner',
  templateUrl: './offer-banner.component.html',
  styleUrls: ['./offer-banner.component.scss']
})
export class OfferBannerComponent implements OnInit {

  arrDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  currentDate = new Date();
  strCurrentDaysName: string = '';
  strShopTypeId: any
  datePipe = new DatePipe('en-US');
  currentTime: string = '';
  arrShopTypes: ShopType[] = [];
  objRestaurant: ShopType[] = [];
  arrayOfObjNonRestaurant: ShopType[] = [];
  count = 0;
  arrayOfOfferBannerImages: any = [];
  arrShops: any[] = [];

  strLanguage: string = '';

  constructor(
    private bannerService: BannerService,
    private shopTypeService: ShopTypeService,
    private shopListingService: ShopListingService,
    private commonService:CommonService,
    private router: Router
    // private translateService: TranslateService

  ) { }

  ngOnInit(): void {
    this.getAllOfferBannerImages();
  }


  getAllOfferBannerImages() {
    const obj = {
      strType: "WEB",
    };
    this.bannerService.getAllOfferImages(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Offer Banner Images::::::::::::::", res);
        this.arrayOfOfferBannerImages = res.data;
        console.log("Offer Banner Images::::::::::::::",  this.arrayOfOfferBannerImages);
      }
    });
  }

  onClickBannerImage(obj) {
    console.log("banner clicked")
    if (obj.fkShopTypeId) {
      if (obj.fkShopId) {

        const { latitude, longitude } = JSON.parse(localStorage.getItem('coordinates'))
        const getTime = this.currentTime.split(':', 2)
        const intTime: number = parseFloat(`${getTime[0]}.${getTime[1]}`)

        const objData = {
          strLatitude: latitude.toString(),
          strLongitude: longitude.toString(),
          strCategoryId: obj.fkShopTypeId,
          strShopId: obj.fkShopId,
          strAvailableDay: this.strCurrentDaysName,
          CurrentHour: intTime,
          intPageLimit: 1,
          intSkipCount: 0
        };

        console.log(objData)

        this.shopListingService.getAllShops(objData).subscribe((res) => {
          console.log("banner shop is",res)
          if (res.success) {
            if (res.data.length && res.data[0].pkShopId == obj.fkShopId) {
              this.arrShops = res.data
              if (obj.fkCategoryId) {
                if (obj.fkSubcatrgoryId) {


                  localStorage.setItem("shopDetails", JSON.stringify(this.arrShops[0]))
                  this.router.navigate(['/product'], {
                    queryParams: { id: obj.fkShopId, catId: obj.fkCategoryId, catName: obj.strCategoryName }
                  });



                } else {

                  localStorage.setItem("shopDetails", JSON.stringify(this.arrShops[0]))
                  this.router.navigate(['/product'], {
                    queryParams: { id: obj.fkShopId, catId: obj.fkCategoryId, catName: obj.strCategoryName }
                  });


                }
              } else {
                localStorage.setItem("shopDetails", JSON.stringify(obj.arrShop[0]))
                this.router.navigate(['/categories'], {
                  queryParams: { id: obj.fkShopTypeId, shopId: obj.fkShopId, name: obj.strShopTypeName },

                });



              }
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Not deliverable',
              }).then(() => {

              })
            }
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Not deliverable',
            }).then(() => {

            })

          }
        })


      } else {

        
        this.router.navigate(['/shop'], {
          queryParams: { id: obj.fkShopTypeId, name: obj.strShopTypeName },

        });

      }
    } else {

    }
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
