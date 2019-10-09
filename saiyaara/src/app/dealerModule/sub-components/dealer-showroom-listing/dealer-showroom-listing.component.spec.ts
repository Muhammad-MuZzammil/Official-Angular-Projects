import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerShowroomListingComponent } from './dealer-showroom-listing.component';

describe('DealerShowroomListingComponent', () => {
  let component: DealerShowroomListingComponent;
  let fixture: ComponentFixture<DealerShowroomListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerShowroomListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerShowroomListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
