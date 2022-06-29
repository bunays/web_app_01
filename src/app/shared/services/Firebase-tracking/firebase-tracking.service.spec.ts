import { TestBed } from '@angular/core/testing';

import { FirebaseTrackingService } from './firebase-tracking.service';

describe('FirebaseTrackingService', () => {
  let service: FirebaseTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
