import { TestBed } from '@angular/core/testing';

import { BestDealsService } from './best-deals.service';

describe('BestDealsService', () => {
  let service: BestDealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestDealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
