/* eslint-disable no-undef */

describe('Home Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Should have all desired elements on the screen', async () => {
    await expect(element(by.id('image:code-scan-area'))).toBeVisible();
    await expect(element(by.id('button:flashlight'))).toBeVisible();
    await expect(element(by.id('image:flashlight-icon-off'))).toBeVisible();
  });

  it('Should toggle flashlight button', async () => {
    await expect(element(by.id('image:flashlight-icon-on'))).toBeNotVisible();
    await expect(element(by.id('image:flashlight-icon-off'))).toBeVisible();
    await element(by.id('button:flashlight')).tap();
    await expect(element(by.id('image:flashlight-icon-on'))).toBeVisible();
    await expect(element(by.id('image:flashlight-icon-off'))).toBeNotVisible();
    await element(by.id('button:flashlight')).tap();
    await expect(element(by.id('image:flashlight-icon-on'))).toBeNotVisible();
    await expect(element(by.id('image:flashlight-icon-off'))).toBeVisible();
  });

  it('Should have all tabbar buttons visible', async () => {
    await expect(element(by.label('Scanner'))).toBeVisible();
    await expect(element(by.label('History'))).toBeVisible();
    await expect(element(by.label('Generate'))).toBeVisible();
    await expect(element(by.label('Settings'))).toBeVisible();
  });
});
