import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReadingsComponent } from './list-readings.component';

describe('ListReadingsComponent', () => {
  let component: ListReadingsComponent;
  let fixture: ComponentFixture<ListReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
