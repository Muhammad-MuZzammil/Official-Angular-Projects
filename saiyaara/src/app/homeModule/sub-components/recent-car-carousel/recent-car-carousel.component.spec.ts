import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCarCarouselComponent } from './recent-car-carousel.component';

describe('RecentCarCarouselComponent', () => {
  let component: RecentCarCarouselComponent;
  let fixture: ComponentFixture<RecentCarCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentCarCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCarCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
