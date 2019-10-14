import { TestBed } from '@angular/core/testing';

import { ViewBidsService } from './view-bids.service';

describe('ViewBidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewBidsService = TestBed.get(ViewBidsService);
    expect(service).toBeTruthy();
  });
});
