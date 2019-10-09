import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedInventoryComponent } from './featured-inventory.component';

describe('FeaturedInventoryComponent', () => {
  let component: FeaturedInventoryComponent;
  let fixture: ComponentFixture<FeaturedInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
