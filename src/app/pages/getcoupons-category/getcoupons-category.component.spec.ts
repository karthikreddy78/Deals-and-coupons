import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcouponsCategoryComponent } from './getcoupons-category.component';

describe('GetcouponsCategoryComponent', () => {
  let component: GetcouponsCategoryComponent;
  let fixture: ComponentFixture<GetcouponsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetcouponsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcouponsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
