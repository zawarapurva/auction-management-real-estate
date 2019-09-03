import { TestBed } from '@angular/core/testing';

import { CreateAuctionService } from './create-auction.service';

describe('CreateAuctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateAuctionService = TestBed.get(CreateAuctionService);
    expect(service).toBeTruthy();
  });
});
