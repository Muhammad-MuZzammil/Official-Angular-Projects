import { UsedCarModule } from './used-car.module';

describe('UsedCarModule', () => {
  let usedCarModule: UsedCarModule;

  beforeEach(() => {
    usedCarModule = new UsedCarModule();
  });

  it('should create an instance', () => {
    expect(usedCarModule).toBeTruthy();
  });
});
