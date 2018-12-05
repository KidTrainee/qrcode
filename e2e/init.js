/* eslint-disable no-undef,import/no-extraneous-dependencies */
const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');
const config = require('../package.json').detox;

jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
  await device.launchApp({
    permissions: {
      camera: 'YES',
    },
  });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
