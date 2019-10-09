import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sec5SaiyaaraComponent } from './sec5-saiyaara.component';

describe('Sec5SaiyaaraComponent', () => {
  let component: Sec5SaiyaaraComponent;
  let fixture: ComponentFixture<Sec5SaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sec5SaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sec5SaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
