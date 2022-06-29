import { TestBed } from '@angular/core/testing';

import { ServiceOrderSuccessGuard } from './service-order-success.guard';

describe('ServiceOrderSuccessGuard', () => {
  let guard: ServiceOrderSuccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServiceOrderSuccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
