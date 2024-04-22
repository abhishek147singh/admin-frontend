import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtAddButtonComponent } from './dt-add-button.component';

describe('DtAddButtonComponent', () => {
  let component: DtAddButtonComponent;
  let fixture: ComponentFixture<DtAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DtAddButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DtAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
