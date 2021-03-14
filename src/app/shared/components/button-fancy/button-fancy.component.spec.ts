import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFancyComponent } from './button-fancy.component';

describe('ButtonFancyComponent', () => {
  let component: ButtonFancyComponent;
  let fixture: ComponentFixture<ButtonFancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
