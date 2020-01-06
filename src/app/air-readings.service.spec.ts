import { TestBed } from '@angular/core/testing';

import { AirReadingsService } from './air-readings.service';

describe('AirReadingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirReadingsService = TestBed.get(AirReadingsService);
    expect(service).toBeTruthy();
  });
});
