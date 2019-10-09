import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sec8SaiyaaraComponent } from './sec8-saiyaara.component';

describe('Sec8SaiyaaraComponent', () => {
  let component: Sec8SaiyaaraComponent;
  let fixture: ComponentFixture<Sec8SaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sec8SaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sec8SaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
