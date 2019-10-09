import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerFilterComponent } from './dealer-filter.component';

describe('DealerFilterComponent', () => {
  let component: DealerFilterComponent;
  let fixture: ComponentFixture<DealerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
