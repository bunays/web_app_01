import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UIModule } from "../shared/ui/ui.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomePageComponent } from './home-page/home-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabScrollToCenterDirective } from 'src/app/shared/directives/scrolling.directive';
import { MatTabScrollToLeftDirective } from 'src/app/shared/directives/scrollleft.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';
import { AuthModule } from "../account/auth/auth.module";
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { TranslateModule } from '@ngx-translate/core';
import { CategoriesComponent } from './home-page/categories/categories.component';
import { MainListComponent } from './home-page/main-list/main-list.component';
import { AllItemsComponent } from './home-page/all-items/all-items.component';
import { PopularComponent } from './home-page/popular/popular.component';
import { FeaturedComponent } from './home-page/featured/featured.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './checkout/cart/cart.component';
import { OrderSummaryComponent } from './checkout/order-summary/order-summary.component';
import { OrderPlaceComponent } from './checkout/order-place/order-place.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SubCategoriesComponent } from './home-page/sub-categories/sub-categories.component';
import { SubcategoryListComponent } from './home-page/subcategory-list/subcategory-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CouponModalComponent } from './checkout/coupon-modal/coupon-modal.component';
import { ScanComponent } from './scan/scan.component';
import { CategoriesSubComponent } from './home-page/categories/categories-sub/categories-sub.component';
import { SubcategoriesSubComponent } from './home-page/sub-categories/subcategories-sub/subcategories-sub.component';
import { SearchProductsComponent } from './home-page/search-products/search-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { BestDealsComponent } from './best-deals/best-deals.component';
import { BestDealsSubComponent } from './best-deals/best-deals-sub/best-deals-sub.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ListViewComponent } from './user-details/list-view/list-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { WebcamModule } from 'ngx-webcam';



@NgModule({
  declarations: [
    HomePageComponent,
    MatTabScrollToCenterDirective,
    MatTabScrollToLeftDirective,
    CategoriesComponent,
    MainListComponent,
    AllItemsComponent,
    PopularComponent,
    FeaturedComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    CartComponent,
    OrderSummaryComponent,
    OrderPlaceComponent,
    FeedbackComponent,
    SubCategoriesComponent,
    SubcategoryListComponent,
    CouponModalComponent,
    ScanComponent,
    CategoriesSubComponent,
    SubcategoriesSubComponent,
    SearchProductsComponent,
    MyOrdersComponent,
    OrderDetailsComponent,
    OrderSuccessComponent,
    BestDealsComponent,
    BestDealsSubComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    UserDetailsComponent,
    ListViewComponent,
    UserProfileComponent
  ],

  entryComponents: [
    CouponModalComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    UIModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatTabsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutsModule,
    AuthModule,
    AgmCoreModule,
    AgmDirectionModule,
    MatSidenavModule,
    MatGoogleMapsAutocompleteModule,
    MatIconModule,
    // WebcamModule,
    SlickCarouselModule,
    TranslateModule,
    MatDialogModule
  ],
  exports: [ProductDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PagesModule { }
