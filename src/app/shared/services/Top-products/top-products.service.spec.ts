import { TestBed } from '@angular/core/testing';

import { TopProductsService } from './top-products.service';

describe('TopProductsService', () => {
  let service: TopProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
