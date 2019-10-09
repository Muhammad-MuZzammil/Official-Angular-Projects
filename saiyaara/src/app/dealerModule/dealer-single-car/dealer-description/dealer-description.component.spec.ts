import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDescriptionComponent } from './dealer-description.component';

describe('DealerDescriptionComponent', () => {
  let component: DealerDescriptionComponent;
  let fixture: ComponentFixture<DealerDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
