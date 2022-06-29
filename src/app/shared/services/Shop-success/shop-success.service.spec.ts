import { TestBed } from '@angular/core/testing';

import { ShopSuccessService } from './shop-success.service';

describe('ShopSuccessService', () => {
  let service: ShopSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
