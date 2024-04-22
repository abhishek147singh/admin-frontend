import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeaturedProductsComponent } from './manage-featured-products.component';

describe('ManageFeaturedProductsComponent', () => {
  let component: ManageFeaturedProductsComponent;
  let fixture: ComponentFixture<ManageFeaturedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFeaturedProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
