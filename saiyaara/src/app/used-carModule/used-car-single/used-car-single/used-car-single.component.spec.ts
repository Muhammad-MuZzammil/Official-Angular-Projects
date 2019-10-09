import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedCarSingleComponent } from './used-car-single.component';

describe('UsedCarSingleComponent', () => {
  let component: UsedCarSingleComponent;
  let fixture: ComponentFixture<UsedCarSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedCarSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedCarSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
