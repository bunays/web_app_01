import { TestBed } from '@angular/core/testing';

import { ShopListingService } from './shop-listing.service';

describe('ShopListingService', () => {
  let service: ShopListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
