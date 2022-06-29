import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryListingService } from 'src/app/shared/services/Category-listing/category-listing.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-categories-sub',
  templateUrl: './categories-sub.component.html',
  styleUrls: ['./categories-sub.component.scss']
})
export class CategoriesSubComponent implements OnInit {

  arrCategories: any[] = [];

  constructor(
    private categoryService: CategoryListingService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private commonService:CommonService
  ) { }

  ngOnInit(): void {
    this.getCategoryListing();
  }

  getCategoryListing() {
    this.spinner.show();
    let obj = {
      strShopId:this.commonService.shopID,
      intPageLimit: 1000,
      intSkipCount:0
    }
    this.categoryService.CategoryList(obj).subscribe((res) => {

      if (res.success) {
        this.spinner.hide();
        this.arrCategories = res.data;
      } else {
        this.spinner.hide();
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

}
