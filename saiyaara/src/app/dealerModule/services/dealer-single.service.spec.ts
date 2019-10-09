import { TestBed, inject } from '@angular/core/testing';

import { DealerSingleService } from './dealer-single.service';

describe('DealerSingleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealerSingleService]
    });
  });

  it('should be created', inject([DealerSingleService], (service: DealerSingleService) => {
    expect(service).toBeTruthy();
  }));
});
