import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedCarListComponent } from './used-car-list.component';

describe('UsedCarListComponent', () => {
  let component: UsedCarListComponent;
  let fixture: ComponentFixture<UsedCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
