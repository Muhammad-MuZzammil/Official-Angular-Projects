import { TestBed, inject } from '@angular/core/testing';

import { UsedCarSingleService } from './used-car-single.service';

describe('UsedCarSingleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsedCarSingleService]
    });
  });

  it('should be created', inject([UsedCarSingleService], (service: UsedCarSingleService) => {
    expect(service).toBeTruthy();
  }));
});
