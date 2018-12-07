/* eslint-disable */
import React from 'react';
import SettingsView, { SettingSwitch, generateCodePreviewColors } from '../SettingsView';
import { shallow } from 'enzyme/build';
import { colors } from '../../../styles';

describe('Settings View', () => {
  it('should render as expected', () => {
    const props = {
      navigation: {
        navigate: () => {},
      },
      settings: {
        batch: true,
        vibrate: true,
        beep: true,
        history: false,
        duplicate: false,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
      },
      goPricingPage: () => {},
      isBackgroundModalVisible: false,
      isForegroundModalVisible: false,
      toggleBackgroundColorModal: () => {},
      toggleForegroundColorModal: () => {},
      handleBackgroundColorPick: () => {},
      handleForegroundColorPick: () => {},
      setSettingValue: () => {},
    };

    const wrapper = shallow(
      <SettingsView {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  })
});

describe('Setting View => Switch', () => {
  it('should render as expected', () => {
    const props = {
      value: true,
      onChange: () => {},
      name: "batch",
    };

    const wrapper = shallow(
      <SettingSwitch {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('should render onChange function by click', () => {
    const mockCallBack = jest.fn();
    const props = {
      value: true,
      onChange: mockCallBack,
      name: "batch",
    };

    const wrapper = shallow(
      <SettingSwitch {...props} />,
    );
    wrapper.find('[testID="switch"]').simulate('valueChange');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
})

describe('Setting View => generateCodePreviewColors', () => {
  it('should return expected result', () => {
    const color = '#ffffff';
    expect(generateCodePreviewColors(color)).toEqual({
      backgroundColor: color,
      borderColor: colors.lightGray,
    })
  })
})
