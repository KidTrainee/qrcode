/* eslint-disable */
import 'jsdom-global/register';
import React from 'react';
import { toClass } from 'recompose';
import { enhance } from '../SettingViewContainer';
import { store } from '../../../redux/store';
import { mount } from 'enzyme/build';

import { initialState } from '../SettingsState';

describe('Settings View Container', () => {
  let wrapper, instance, mockFunction = jest.fn();

  beforeEach(function () {
    const ComponentClass = toClass(() => <div>component</div>)
    const EnhancedComponent = enhance(ComponentClass)

    wrapper = mount(<EnhancedComponent store={store} navigation={{ navigate:  mockFunction }} />);
    instance = wrapper.find(ComponentClass);
  });

  it('should pass needed props', () => {
    expect(instance.props()).toHaveProperty('goPricingPage');
    expect(instance.props()).toHaveProperty('handleBackgroundColorPick');
    expect(instance.props()).toHaveProperty('handleForegroundColorPick');
    expect(instance.props()).toHaveProperty('isBackgroundModalVisible', false);
    expect(instance.props()).toHaveProperty('isForegroundModalVisible', false);
    expect(instance.props()).toHaveProperty('setSettingValue');
    expect(instance.props()).toHaveProperty('settings', initialState);
    expect(instance.props()).toHaveProperty('toggleBackgroundColorModal');
    expect(instance.props()).toHaveProperty('toggleForegroundColorModal');
  })

  it('should handle ToggleModal call', () => {
    instance.props().toggleBackgroundColorModal();
    expect(instance.instance().props.isBackgroundModalVisible).toBe(true);

    instance.props().toggleForegroundColorModal();
    expect(instance.instance().props.isForegroundModalVisible).toBe(true);

    instance.props().toggleBackgroundColorModal();
    expect(instance.instance().props.isBackgroundModalVisible).toBe(false);

    instance.props().toggleForegroundColorModal();
    expect(instance.instance().props.isForegroundModalVisible).toBe(false);
  })

  it('should handle ColorPick call', () => {
    instance.props().handleBackgroundColorPick('#000000');
    expect(instance.instance().props.settings.backgroundColor).toBe('#000000');

    instance.props().handleForegroundColorPick('#ffffff');
    expect(instance.instance().props.settings.foregroundColor).toBe('#ffffff');
  })

  it('should handle goPricingPage call', () => {
    instance.props().goPricingPage();

    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction.mock.calls[0][0]).toBe('Pricing');
  })
});
