import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAreaComponent } from './finance-area.component';

describe('FinanceAreaComponent', () => {
  let component: FinanceAreaComponent;
  let fixture: ComponentFixture<FinanceAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
