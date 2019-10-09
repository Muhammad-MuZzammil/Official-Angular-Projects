import { UsedCarSingleModuleModule } from './used-car-single.module';

describe('UsedCarSingleModuleModule', () => {
  let usedCarSingleModuleModule: UsedCarSingleModuleModule;

  beforeEach(() => {
    usedCarSingleModuleModule = new UsedCarSingleModuleModule();
  });

  it('should create an instance', () => {
    expect(usedCarSingleModuleModule).toBeTruthy();
  });
});
