import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from 'src/app/shared/services/Search/search.service';
import { Product } from 'src/app/core/models/products.model';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-best-deals',
  templateUrl: './best-deals.component.html',
  styleUrls: ['./best-deals.component.scss']
})
export class BestDealsComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.drawer.close();
  }

  state: string = 'default';

  event: string;

  searchResult: boolean = false;
  intCartItemCount: number = 0;
  arrCart: any[] = [];

  arrProducts: Product[] = [];
  searchString: string;

  @ViewChild('searchTags', { static: false }) searchTag: ElementRef;

  constructor(
    private modalService: NgbModal,
    private searchService: SearchService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchResult = false

    let Cart: any = JSON.parse(localStorage.getItem("SMCart"));
    if (Cart && Cart.length) {
      this.arrCart = Cart
    } else {
      this.arrCart = []
    }

    this.intCartItemCount = this.arrCart.length;
  }

  ngAfterViewInit() {
    fromEvent(this.searchTag.nativeElement, 'keyup')
      .pipe(map(() => this.searchTag.nativeElement.value), debounceTime(800), distinctUntilChanged())
      .subscribe((value) => {

        // console.log('Response::::::', value);
        this.searchMethod(value);
      });
  }

  searchMethod(value: string) {
    const obj = {
      strSearchTag: value,
      strSkipCount: '',
      strPageLimit: '',
      fkShopId: this.commonService.shopID,
      strShopId: this.commonService.shopID
    }

    this.searchService.getAllSearchResults(obj).subscribe((res) => {
      if (res.success) {
        this.searchResult = true;
        this.arrProducts = res.data;
      }
      else {
        this.arrProducts = [];
        // this.searchResult = false;
      }

      // if (this.arrProducts.length == 0) {
      //   if (this.searchString.length) {
      //     this.searchResult = true
      //   } else {
      //     this.searchResult = true
      //   }
      // }
      console.log('Search Response:::::::', this.arrProducts);
    })
  }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
