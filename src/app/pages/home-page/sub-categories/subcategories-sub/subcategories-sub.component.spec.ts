import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesSubComponent } from './subcategories-sub.component';

describe('SubcategoriesSubComponent', () => {
  let component: SubcategoriesSubComponent;
  let fixture: ComponentFixture<SubcategoriesSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriesSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriesSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
