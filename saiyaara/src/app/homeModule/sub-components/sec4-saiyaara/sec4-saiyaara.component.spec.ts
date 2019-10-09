import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sec4SaiyaaraComponent } from './sec4-saiyaara.component';

describe('Sec4SaiyaaraComponent', () => {
  let component: Sec4SaiyaaraComponent;
  let fixture: ComponentFixture<Sec4SaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sec4SaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sec4SaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
