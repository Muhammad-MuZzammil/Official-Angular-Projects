import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondHandCarSearchComponent } from './second-hand-car-search.component';

describe('SecondHandCarSearchComponent', () => {
  let component: SecondHandCarSearchComponent;
  let fixture: ComponentFixture<SecondHandCarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondHandCarSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondHandCarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
