/* eslint-disable no-undef */
import { codeTypesList } from '../src/modules/newCode/NewCodeState';

describe('Generator Screen', () => {
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

  it('Should click through all tabs', async () => {
    await expect(element(by.id('input:text'))).toBeVisible();

    await element(by.id(`button:codeType-${codeTypesList.URL}`)).tap();
    await expect(element(by.id('input:url'))).toBeVisible();

    await element(by.id(`button:codeType-${codeTypesList.EMAIL}`)).tap();
    await expect(element(by.id('input:to'))).toBeVisible();
    await expect(element(by.id('input:subject'))).toBeVisible();
    await expect(element(by.id('input:message'))).toBeVisible();
    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);

    await element(by.id(`button:codeType-${codeTypesList.TEL}`)).tap();
    await expect(element(by.id('input:tel'))).toBeVisible();

    await element(by.id(`button:codeType-${codeTypesList.CONTACT}`)).tap();
    await expect(element(by.id('input:first-name'))).toBeVisible();
    await expect(element(by.id('input:last-name'))).toBeVisible();
    await expect(element(by.id('input:phone'))).toBeVisible();
    await expect(element(by.id('input:email'))).toBeVisible();
    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);

    await element(by.id(`button:codeType-${codeTypesList.SMS}`)).tap();
    await expect(element(by.id('input:phone-number'))).toBeVisible();
    await expect(element(by.id('input:message'))).toBeVisible();

    await element(by.id(`button:codeType-${codeTypesList.GEO}`)).tap();
    await expect(element(by.id('input:long'))).toBeVisible();
    await expect(element(by.id('input:lat'))).toBeVisible();
    await element(by.id('scroll:code-type')).scrollTo('right');

    await element(by.id(`button:codeType-${codeTypesList.EVENT}`)).tap();
    await expect(element(by.id('input:title'))).toBeVisible();
    await expect(element(by.id('input:description'))).toBeVisible();
    await expect(element(by.id('input:location'))).toBeVisible();

    await element(by.id(`button:codeType-${codeTypesList.WIFI}`)).tap();
    await expect(element(by.id('input:ssid'))).toBeVisible();
    await expect(element(by.id('input:password'))).toBeVisible();
  });

  it('Should generate text code', async () => {
    await expect(element(by.id('input:text'))).toBeVisible();
    await element(by.id('input:text')).replaceText('text');
    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate url code', async () => {
    await element(by.id(`button:codeType-${codeTypesList.URL}`)).tap();
    await expect(element(by.id('input:url'))).toBeVisible();
    await element(by.id('input:url')).replaceText('text');
    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate email code', async () => {
    await element(by.id(`button:codeType-${codeTypesList.EMAIL}`)).tap();

    await element(by.id('input:to')).replaceText('text');
    await element(by.id('input:subject')).replaceText('text');
    await element(by.id('input:message')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate url code', async () => {
    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);
    await element(by.id(`button:codeType-${codeTypesList.TEL}`)).tap();

    await element(by.id('input:tel')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate contact code', async () => {
    await element(by.id('scroll:code-type')).swipe('left', 'slow');
    await element(by.id(`button:codeType-${codeTypesList.CONTACT}`)).tap();

    await element(by.id('input:first-name')).replaceText('text');
    await element(by.id('input:last-name')).replaceText('text');
    await element(by.id('input:phone')).replaceText('text');
    await element(by.id('input:email')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate sms code', async () => {
    await element(by.id('scroll:code-type')).swipe('left', 'slow');
    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);
    await element(by.id(`button:codeType-${codeTypesList.SMS}`)).tap();

    await element(by.id('input:phone-number')).replaceText('text');
    await element(by.id('input:message')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate geo code', async () => {
    await element(by.id('scroll:code-type')).swipe('left', 'slow');
    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);
    await element(by.id(`button:codeType-${codeTypesList.GEO}`)).tap();

    await element(by.id('input:long')).replaceText('text');
    await element(by.id('input:lat')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate geo code', async () => {
    await element(by.id('scroll:code-type')).scrollTo('right');
    await element(by.id(`button:codeType-${codeTypesList.GEO}`)).tap();

    await element(by.id('input:long')).replaceText('text');
    await element(by.id('input:lat')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate event code', async () => {
    await element(by.id('scroll:code-type')).scrollTo('right');
    await element(by.id(`button:codeType-${codeTypesList.EVENT}`)).tap();

    await element(by.id('input:title')).replaceText('text');
    await element(by.id('input:description')).replaceText('text');
    await element(by.id('input:location')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate wifi code', async () => {
    await element(by.id('scroll:code-type')).scrollTo('right');
    await element(by.id(`button:codeType-${codeTypesList.WIFI}`)).tap();

    await element(by.id('input:ssid')).replaceText('text');
    await element(by.id('input:password')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();
  });

  it('Should generate all types in order', async () => {
    await expect(element(by.id('input:text'))).toBeVisible();
    await element(by.id('input:text')).replaceText('text');
    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id(`button:codeType-${codeTypesList.URL}`)).tap();
    await expect(element(by.id('input:url'))).toBeVisible();
    await element(by.id('input:url')).replaceText('text');
    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id(`button:codeType-${codeTypesList.EMAIL}`)).tap();

    await element(by.id('input:to')).replaceText('text');
    await element(by.id('input:subject')).replaceText('text');
    await element(by.id('input:message')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);
    await element(by.id(`button:codeType-${codeTypesList.TEL}`)).tap();

    await element(by.id('input:tel')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id(`button:codeType-${codeTypesList.CONTACT}`)).tap();

    await element(by.id('input:first-name')).replaceText('text');
    await element(by.id('input:last-name')).replaceText('text');
    await element(by.id('input:phone')).replaceText('text');
    await element(by.id('input:email')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id('scroll:code-type')).swipe('left', 'slow', 0.5);
    await element(by.id(`button:codeType-${codeTypesList.SMS}`)).tap();

    await element(by.id('input:phone-number')).replaceText('text');
    await element(by.id('input:message')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id(`button:codeType-${codeTypesList.GEO}`)).tap();

    await element(by.id('input:long')).replaceText('text');
    await element(by.id('input:lat')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id('scroll:code-type')).scrollTo('right');
    await element(by.id(`button:codeType-${codeTypesList.EVENT}`)).tap();

    await element(by.id('input:title')).replaceText('text');
    await element(by.id('input:description')).replaceText('text');
    await element(by.id('input:location')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();

    await element(by.id('scroll:code-type')).scrollTo('right');
    await element(by.id(`button:codeType-${codeTypesList.WIFI}`)).tap();

    await element(by.id('input:ssid')).replaceText('text');
    await element(by.id('input:password')).replaceText('text');

    await element(by.id('button:generate')).tap();

    await expect(element(by.type('RNSVGSvgView'))).toBeVisible();
    await expect(element(by.id('button:share'))).toBeVisible();
    await expect(element(by.id('button:customize'))).toBeVisible();

    await element(by.id('button:back')).tap();
  });
});
