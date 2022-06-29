import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSubComponent } from './categories-sub.component';

describe('CategoriesSubComponent', () => {
  let component: CategoriesSubComponent;
  let fixture: ComponentFixture<CategoriesSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
