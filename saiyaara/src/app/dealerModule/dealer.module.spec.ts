import { DealerModule } from './dealer.module';

describe('DealerModule', () => {
  let dealerModule: DealerModule;

  beforeEach(() => {
    dealerModule = new DealerModule();
  });

  it('should create an instance', () => {
    expect(dealerModule).toBeTruthy();
  });
});
