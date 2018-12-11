
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
  CustomInput,
} from '../ScannedCodeView';

import ScannedCode from '../ScannedCodeViewContainer';
import { store } from '../../../redux/store';

jest.mock('Linking', () => ({
  openURL: jest.fn(),
  canOpenURL: valid => (new Promise(resolve => (valid ? resolve(true) : resolve(false)))),
}));

jest.mock('Clipboard', () => ({
  setString: jest.fn(),
}));

describe('ScannedCode => CustomInput', () => {
  it('renders as expected', () => {
    const wrapper = Enzyme.shallow(
      <CustomInput
        key="key"
        text70
        floatingPlaceholder
        placeholder="Title"
        value="string"
        editable={false}
        disabledColor="gray"
        floatingPlaceholderColor="black"
        copyToClipboard={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('copies data to clipboard on click', () => {
    const clipboardSetStringSpy = sinon.spy();
    const wrapper = Enzyme.shallow(
      <CustomInput
        key="key"
        text70
        floatingPlaceholder
        placeholder="Title"
        value="string"
        editable={false}
        disabledColor="gray"
        floatingPlaceholderColor="black"
        copyToClipboard={clipboardSetStringSpy}
      />,
    );

    const render = wrapper.dive();
    render.find('TouchableOpacity').first().simulate('press');
    expect(clipboardSetStringSpy.calledWith('string')).toBe(true);
  });
});

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
        store={store}
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
