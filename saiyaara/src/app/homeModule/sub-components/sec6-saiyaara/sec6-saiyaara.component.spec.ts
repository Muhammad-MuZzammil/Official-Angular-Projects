import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sec6SaiyaaraComponent } from './sec6-saiyaara.component';

describe('Sec6SaiyaaraComponent', () => {
  let component: Sec6SaiyaaraComponent;
  let fixture: ComponentFixture<Sec6SaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sec6SaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sec6SaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
