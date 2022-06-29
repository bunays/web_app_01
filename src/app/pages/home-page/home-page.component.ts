import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from './../../shared/services/Search/search.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from 'src/app/core/models/products.model';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/Cart/cart.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('rotated => default', animate('400ms ease-in')),
      transition('default => rotated', animate('400ms ease-in'))
    ]),

    trigger('openClosed', [
      state('opened', style({ transform: 'translateZ(-500px) translateX(50%) rotateY(-45deg)' })),
      state('closed', style({ transform: 'translateZ(0px) translateX(0%) rotateY(0deg)' })),
      transition('opened <=> closed', animate('300ms linear')),
      transition('closed <=> opened', animate('300ms linear'))
    ]),

    // trigger('openClosed', [
    //   state('open', style({ width: '500px' })),
    //   state('closed', style({ width: '0px' })),
    //   transition('open <=> closed', animate('300ms ease-in')),
    //   transition('closed <=> open', animate('300ms ease-in'))
    // ])
    // trigger('indicatorRotate', [
    //   state('collapsed', style({ transform: 'rotate(0deg)' })),
    //   state('expanded', style({ transform: 'rotate(180deg)' })),
    //   transition('expanded <=> collapsed',
    //     animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
    //   ),
    // ])
  ]
})
export class HomePageComponent implements OnInit {

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

  selected: any;
  toggle: boolean = false;
  // status = "Enable";

  @ViewChild('searchTags', { static: false }) searchTag: ElementRef;

  constructor(
    private modalService: NgbModal,
    private searchService: SearchService,
    private router: Router,
    private cartService:CartService,
    private commonService: CommonService
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

  tab: any = 'tab3';
  tab1: any
  tab2: any
  tab3: any
  tab4: any
  tab5: any





  onClick(check) {
    //    console.log(check);
    if (check == 1) {
      this.tab = 'tab1';
    } else if (check == 2) {
      this.tab = 'tab2';
    } else if (check == 3) {
      this.tab = 'tab3';
    } else if (check == 4) {
      this.tab = 'tab4';
    } else {
      this.tab = 'tab5';
    }

  }


  enableDisable() {
    this.toggle = !this.toggle;
    // this.status = this.toggle ? "Enable" : "Disable";
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
        this.searchResult = false;
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
