import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDeleteButtonComponent } from './dt-delete-button.component';

describe('DtDeleteButtonComponent', () => {
  let component: DtDeleteButtonComponent;
  let fixture: ComponentFixture<DtDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtDeleteButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
