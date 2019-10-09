import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRateUnder10LacsComponent } from './car-rate-under10-lacs.component';

describe('CarRateUnder10LacsComponent', () => {
  let component: CarRateUnder10LacsComponent;
  let fixture: ComponentFixture<CarRateUnder10LacsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRateUnder10LacsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRateUnder10LacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
