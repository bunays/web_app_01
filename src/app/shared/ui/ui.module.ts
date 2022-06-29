import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbCarouselModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { TopBannerComponent } from './top-banner/top-banner.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PreloaderComponent } from './preloader/preloader.component';
import { ItemCarouselComponent } from './item-carousel/item-carousel.component';
import { OfferBannerComponent } from './offer-banner/offer-banner.component';




@NgModule({
  declarations: [TopBannerComponent, PreloaderComponent, ItemCarouselComponent, OfferBannerComponent],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbCarouselModule,
    RouterModule,
    SlickCarouselModule,

  ],
  exports: [TopBannerComponent, PreloaderComponent, ItemCarouselComponent, OfferBannerComponent]

})
export class UIModule { }
