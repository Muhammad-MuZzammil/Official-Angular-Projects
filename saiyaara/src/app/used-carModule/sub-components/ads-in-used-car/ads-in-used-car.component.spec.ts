import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsInUsedCarComponent } from './ads-in-used-car.component';

describe('AdsInUsedCarComponent', () => {
  let component: AdsInUsedCarComponent;
  let fixture: ComponentFixture<AdsInUsedCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsInUsedCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsInUsedCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
