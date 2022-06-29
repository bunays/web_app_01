import { TestBed } from '@angular/core/testing';

import { CategoryListingService } from './category-listing.service';

describe('CategoryListingService', () => {
  let service: CategoryListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
