import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRateUnder30LacsComponent } from './car-rate-under30-lacs.component';

describe('CarRateUnder30LacsComponent', () => {
  let component: CarRateUnder30LacsComponent;
  let fixture: ComponentFixture<CarRateUnder30LacsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRateUnder30LacsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRateUnder30LacsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
