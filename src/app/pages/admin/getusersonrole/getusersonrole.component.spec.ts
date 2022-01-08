import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetusersonroleComponent } from './getusersonrole.component';

describe('GetusersonroleComponent', () => {
  let component: GetusersonroleComponent;
  let fixture: ComponentFixture<GetusersonroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetusersonroleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetusersonroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
