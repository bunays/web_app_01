import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealsSubComponent } from './best-deals-sub.component';

describe('BestDealsSubComponent', () => {
  let component: BestDealsSubComponent;
  let fixture: ComponentFixture<BestDealsSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDealsSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDealsSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
