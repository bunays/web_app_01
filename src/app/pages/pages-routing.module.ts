import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestDealsComponent } from './best-deals/best-deals.component';
import { CartComponent } from './checkout/cart/cart.component';
import { OrderPlaceComponent } from './checkout/order-place/order-place.component';
import { OrderSummaryComponent } from './checkout/order-summary/order-summary.component';
import { CategoriesComponent } from './home-page/categories/categories.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SubCategoriesComponent } from './home-page/sub-categories/sub-categories.component';
import { SubcategoryListComponent } from './home-page/subcategory-list/subcategory-list.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ScanComponent } from './scan/scan.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { UserDetailsComponent } from './user-details/user-details.component';



const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: UserDetailsComponent,
  },
  {
    path: 'best-deals',
    component: BestDealsComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'sub-categories',
    component: SubCategoriesComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent,
  },
  {
    path: 'order-confirm',
    component: OrderPlaceComponent,
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
  },
  {
    path: 'terms-&-conditions',
    component: TermsConditionsComponent,
  },
  {
    path: 'scan',
    component: ScanComponent,
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
