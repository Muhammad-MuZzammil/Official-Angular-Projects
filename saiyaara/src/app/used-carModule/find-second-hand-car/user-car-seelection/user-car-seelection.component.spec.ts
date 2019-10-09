import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCarSeelectionComponent } from './user-car-seelection.component';

describe('UserCarSeelectionComponent', () => {
  let component: UserCarSeelectionComponent;
  let fixture: ComponentFixture<UserCarSeelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCarSeelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCarSeelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
