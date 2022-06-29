import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/Products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BestDealsService } from 'src/app/shared/services/Best-deals/best-deals.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-best-deals-sub',
  templateUrl: './best-deals-sub.component.html',
  styleUrls: ['./best-deals-sub.component.scss']
})
export class BestDealsSubComponent implements OnInit {

  strBestDealId: string = '';

  arrayOfBestDeals: any = [];

  constructor(
    private bestDealsService: BestDealsService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAllBestDeals();
  }

  getAllBestDeals() {
    const obj = {
      strShopId:this.commonService.shopID,
      intSkipCount: 0,
      intPageLimit: 1000
    };
    this.bestDealsService.BestDealsList(obj).subscribe((res) => {
      if (res.success === true) {
        console.log("Best Deals::::::::::::::", res);
        if (res.success) {
          this.arrayOfBestDeals = res.data;
        } else {
          this.arrayOfBestDeals = []
        }

      }
    });
  }


  onClickNavigate(product) {
    this.router.navigate(['/product-details'], {
      queryParams: { id: product.pkShopProductId }
    })
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
