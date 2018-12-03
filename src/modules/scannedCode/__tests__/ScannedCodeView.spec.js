
/* eslint-disable no-undef */
import React from 'react';
import Enzyme from 'enzyme';

import {
  ShareButton,
  CopyButton,
  OpenButton,
  capitalizeFirstLetter,
} from '../ScannedCodeView';

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
