/* eslint-disable no-undef */
import { codeTypesList } from '../src/modules/newCode/NewCodeState';

describe('Home Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    // Go to the generator tab
    await element(by.label('Generate')).tap();
  });

  it('Should have all desired elements on the screen', async () => {
    await expect(element(by.id('label:generate-code'))).toBeVisible();
    await expect(element(by.id('button:generate'))).toBeVisible();
    Object.keys(codeTypesList).forEach(async (key) => {
      await expect(element(by.id(`button:codeType-${codeTypesList[key]}`))).toExist();
    });
  });
});
