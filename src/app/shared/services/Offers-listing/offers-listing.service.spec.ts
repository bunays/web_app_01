import { TestBed } from '@angular/core/testing';

import { OffersListingService } from './offers-listing.service';

describe('OffersListingService', () => {
  let service: OffersListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
