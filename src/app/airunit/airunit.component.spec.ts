import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirunitComponent } from './airunit.component';

describe('AirunitComponent', () => {
  let component: AirunitComponent;
  let fixture: ComponentFixture<AirunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
