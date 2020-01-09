import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasChartComponent } from './gas-chart.component';

describe('GasChartComponent', () => {
  let component: GasChartComponent;
  let fixture: ComponentFixture<GasChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
