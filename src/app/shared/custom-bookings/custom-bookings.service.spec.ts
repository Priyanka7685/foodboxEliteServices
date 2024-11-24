import { TestBed } from '@angular/core/testing';

import { CustomBookingsService } from './custom-bookings.service';

describe('CustomBookingsService', () => {
  let service: CustomBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
