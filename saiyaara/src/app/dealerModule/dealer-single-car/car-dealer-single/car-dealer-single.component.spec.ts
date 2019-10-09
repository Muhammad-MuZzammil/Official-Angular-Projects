import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDealerSingleComponent } from './car-dealer-single.component';

describe('CarDealerSingleComponent', () => {
  let component: CarDealerSingleComponent;
  let fixture: ComponentFixture<CarDealerSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDealerSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDealerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
