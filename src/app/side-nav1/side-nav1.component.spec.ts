import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNav1Component } from './side-nav1.component';

describe('SideNav1Component', () => {
  let component: SideNav1Component;
  let fixture: ComponentFixture<SideNav1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNav1Component]
    });
    fixture = TestBed.createComponent(SideNav1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
