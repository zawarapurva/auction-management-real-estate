import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidsPopupComponent } from './view-bids-popup.component';

describe('ViewBidsPopupComponent', () => {
  let component: ViewBidsPopupComponent;
  let fixture: ComponentFixture<ViewBidsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBidsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
