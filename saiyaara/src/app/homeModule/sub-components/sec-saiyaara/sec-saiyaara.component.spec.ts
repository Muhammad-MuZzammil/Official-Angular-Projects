import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecSaiyaaraComponent } from './sec-saiyaara.component';

describe('SecSaiyaaraComponent', () => {
  let component: SecSaiyaaraComponent;
  let fixture: ComponentFixture<SecSaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecSaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecSaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
