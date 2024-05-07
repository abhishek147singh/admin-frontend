import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDetailsPopupComponent } from './view-order-details-popup.component';

describe('ViewOrderDetailsPopupComponent', () => {
  let component: ViewOrderDetailsPopupComponent;
  let fixture: ComponentFixture<ViewOrderDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOrderDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
