import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtEditButtonComponent } from './dt-edit-button.component';

describe('DtEditButtonComponent', () => {
  let component: DtEditButtonComponent;
  let fixture: ComponentFixture<DtEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtEditButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
