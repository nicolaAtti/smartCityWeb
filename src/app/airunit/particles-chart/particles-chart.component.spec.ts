import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticlesChartComponent } from './particles-chart.component';

describe('ParticlesChartComponent', () => {
  let component: ParticlesChartComponent;
  let fixture: ComponentFixture<ParticlesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticlesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticlesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
