import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCarSearchComponent } from './quick-car-search.component';

describe('QuickCarSearchComponent', () => {
  let component: QuickCarSearchComponent;
  let fixture: ComponentFixture<QuickCarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
