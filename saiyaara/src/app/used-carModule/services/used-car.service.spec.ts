import { TestBed, inject } from '@angular/core/testing';

import { UsedCarService } from './used-car.service';

describe('UsedCarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsedCarService]
    });
  });

  it('should be created', inject([UsedCarService], (service: UsedCarService) => {
    expect(service).toBeTruthy();
  }));
});
