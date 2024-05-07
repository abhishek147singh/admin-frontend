import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtShowBtnComponent } from './dt-show-btn.component';

describe('DtShowBtnComponent', () => {
  let component: DtShowBtnComponent;
  let fixture: ComponentFixture<DtShowBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtShowBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtShowBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
