import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSaiyaaraComponent } from './about-saiyaara.component';

describe('AboutSaiyaaraComponent', () => {
  let component: AboutSaiyaaraComponent;
  let fixture: ComponentFixture<AboutSaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
