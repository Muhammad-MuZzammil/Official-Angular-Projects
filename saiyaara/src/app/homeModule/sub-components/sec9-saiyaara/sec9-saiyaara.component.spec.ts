import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sec9SaiyaaraComponent } from './sec9-saiyaara.component';

describe('Sec9SaiyaaraComponent', () => {
  let component: Sec9SaiyaaraComponent;
  let fixture: ComponentFixture<Sec9SaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sec9SaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sec9SaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
