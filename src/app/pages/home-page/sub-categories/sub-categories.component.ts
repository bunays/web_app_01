import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { SearchService } from 'src/app/shared/services/Search/search.service';
import { Product } from 'src/app/core/models/products.model';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('rotated => default', animate('400ms ease-in')),
      transition('default => rotated', animate('400ms ease-in'))
    ]),

    trigger('openClosed', [
      state('opened', style({ transform: 'translateZ(-500px) translateX(50%) rotateY(-45deg)'})),
      state('closed', style({ transform: 'translateZ(0px) translateX(0%) rotateY(0deg)' })),
      transition('opened <=> closed', animate('300ms linear')),
      transition('closed <=> opened', animate('300ms linear'))
    ])
  ]
})
export class SubCategoriesComponent implements OnInit {

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
      if(res.success) {
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

  openCartDetails(cart) {
    this.modalService.open(cart, { centered: true });
  }

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
    setTimeout(() => {
      this.router.navigate(['/scan'])
    }, 500);
    
  }

  animate1() {
    this.event = 'opened';
  }

  animate2() {
    this.event = 'closed';
  }

}
