import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/Products/products.service';
import { SubcategoryService } from 'src/app/shared/services/Subcategory/subcategory.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-subcategories-sub',
  templateUrl: './subcategories-sub.component.html',
  styleUrls: ['./subcategories-sub.component.scss'],
})
export class SubcategoriesSubComponent implements OnInit {

  arrSubCategory: any = [];
  arrSubCategoryProducts: any = [];
  strSubCategoryId: string = '';

  @Output()
  SubCategoryId = new EventEmitter<string>();
  @Output()
  isNotSubCategory = new EventEmitter<boolean>();

  intSubCatIndex: number;

  strCategoryId: string = '';

  state: string = 'default';

  event: string;
  blnEmptySubCategories: boolean = false;

  selected: any;


  constructor(
    private subCategoryService: SubcategoryService,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        (this.strCategoryId = params.catId)
        this.getAllSubCategoryFn();
      });

    // this.getAllSubCategoriesProducts();
  }

  // select(value) {

  // }

  isActive(value) {
    return this.selected === value;
  };


  onSubCategoryChange(value) {
    this.selected = value;
    this.strSubCategoryId = value
    console.log("sub cat id", this.strSubCategoryId)
    this.arrSubCategoryProducts = [];
    this.getAllSubCategoriesProducts();
  }

  getAllSubCategoryFn() {
    this.spinner.show();
    const obj = {
      strCategoryId: this.strCategoryId
    }
    console.log("Object response:::", obj);
    this.arrSubCategoryProducts = [];
    this.arrSubCategory = []
    this.subCategoryService.getAllSubCategory(obj).subscribe((res) => {
      console.log("sub-cat response", res)
      if (res.success) {
        this.spinner.hide();
        this.arrSubCategory = res.data;
        if (this.arrSubCategory.length) {
          this.onSubCategoryChange(this.arrSubCategory[0].pkCategoryId)
        }

        // if (!this.arrSubCategory.length) {
        //   console.log('Sub Category is empty after success response:::::::');
        //   this.isNotSubCategory.emit(true)
        //   return;
        // }
        // this.SubCategoryId.emit(this.arrSubCategory[0]?.pkCategoryId)
      } else {
        this.spinner.hide();
        this.arrSubCategory = [];
      }
    })
  }

  getAllSubCategoriesProducts() {
    this.spinner.show();
    const obj = {
      blnVeg: "",
      strShopId:this.commonService.shopID,
      strSubCategoryId: this.strSubCategoryId,
      intSkipCount: 0,
      intPageLimit: 1000
    }
    console.log("sub-cat product object response:::", obj);
    this.productsService.getAllProducts(obj).subscribe((res) => {
      console.log("sub-cat product response", res)
      if (res.success) {
        this.spinner.hide();
        this.blnEmptySubCategories = false;
        this.arrSubCategoryProducts = res.data[0].Products;
      } else {
        this.spinner.hide();
        this.blnEmptySubCategories = true;
        this.arrSubCategoryProducts = [];
      }
    })
  }

  onSubCategoryEmpty(event) {
    if (event === true) {
      this.arrSubCategoryProducts = [];
    }
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
