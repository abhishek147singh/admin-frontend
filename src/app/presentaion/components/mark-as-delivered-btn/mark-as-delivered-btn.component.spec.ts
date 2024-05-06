import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsDeliveredBtnComponent } from './mark-as-delivered-btn.component';

describe('MarkAsDeliveredBtnComponent', () => {
  let component: MarkAsDeliveredBtnComponent;
  let fixture: ComponentFixture<MarkAsDeliveredBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkAsDeliveredBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkAsDeliveredBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
