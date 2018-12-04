
/* eslint-disable no-undef */
import React from 'react';
import { Linking } from 'react-native';
import sinon from 'sinon';
import Enzyme from 'enzyme';

import {
  ShareButton,
  CopyButton,
  OpenButton,
  capitalizeFirstLetter,
  openLink,
} from '../ScannedCodeView';

import ScannedCode from '../ScannedCodeViewContainer';

jest.mock('Linking', () => ({
  openURL: jest.fn(),
  canOpenURL: valid => (new Promise(resolve => (valid ? resolve(true) : resolve(false)))),
}));

describe('ScannedCode => ShareButton', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <ShareButton
        data="https://insiderdev.com"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ScannedCode => CopyButton', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <CopyButton
        data="https://insiderdev.com"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ScannedCode => OpenButton', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <OpenButton
        data="https://insiderdev.com"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('capitalizeFirstLetter', () => {
  it('should work properly', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    expect(capitalizeFirstLetter('Hello world')).toBe('Hello world');
    expect(capitalizeFirstLetter('')).toBe('');
  });
});

describe('openLink', () => {
  it('should work properly', () => {
    const linkingOpenURLSpy = sinon.spy(Linking, 'openURL');
    openLink(true).then(() => {
      expect(linkingOpenURLSpy.calledWith('https://google.com')).toBe(true);
    });
  });
});

describe('ScannedCode', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <ScannedCode
        navigation={{
          state: {
            params: {
              data: 'hello',
            },
          },
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
