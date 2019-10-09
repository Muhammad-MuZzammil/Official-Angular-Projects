import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sec7SaiyaaraComponent } from './sec7-saiyaara.component';

describe('Sec7SaiyaaraComponent', () => {
  let component: Sec7SaiyaaraComponent;
  let fixture: ComponentFixture<Sec7SaiyaaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sec7SaiyaaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sec7SaiyaaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
