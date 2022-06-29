import { TestBed } from '@angular/core/testing';

import { DineinService } from './dinein.service';

describe('DineinService', () => {
  let service: DineinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DineinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
