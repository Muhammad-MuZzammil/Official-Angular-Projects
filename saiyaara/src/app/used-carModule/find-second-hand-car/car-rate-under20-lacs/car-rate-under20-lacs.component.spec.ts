import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRateUnder20LacsComponent } from './car-rate-under20-lacs.component';

describe('CarRateUnder20LacsComponent', () => {
  let component: CarRateUnder20LacsComponent;
  let fixture: ComponentFixture<CarRateUnder20LacsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRateUnder20LacsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRateUnder20LacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
