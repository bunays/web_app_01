import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  @Input()
  products: Product[] = []

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickNavigate(product) {
    this.router.navigate(['/product-details'], {
      queryParams: {id: product.pkShopProductId}
    })
  }

  errorImage(event) {
    event.target.src = 'assets/images/not_found.jpg';
  }

}
