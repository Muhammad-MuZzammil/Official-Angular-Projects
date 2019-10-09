import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondHandUsedCarComponent } from './second-hand-used-car.component';

describe('SecondHandUsedCarComponent', () => {
  let component: SecondHandUsedCarComponent;
  let fixture: ComponentFixture<SecondHandUsedCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondHandUsedCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondHandUsedCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
