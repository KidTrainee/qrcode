/* eslint-disable */
import 'jsdom-global/register';
import React from 'react';
import { toClass } from 'recompose';
import { enhance } from '../PricingViewContainer';
import { store } from '../../../redux/store';
import { mount } from 'enzyme/build';

describe('Pricing View Container', () => {
  let wrapper, instance, mockFunction = jest.fn();

  beforeEach(function () {
    mockFunction = jest.fn();
    const ComponentClass = toClass(() => <div>component</div>)
    const EnhancedComponent = enhance(ComponentClass)

    wrapper = mount(<EnhancedComponent store={store} navigation={{ pop: mockFunction }} />);
    instance = wrapper.find(ComponentClass);
  });

  it('should pass needed props', () => {
    expect(instance.props()).toHaveProperty('isPro');
    expect(instance.props()).toHaveProperty('setIsPro');
    expect(instance.props()).toHaveProperty('showErrorAlert');
    expect(instance.props()).toHaveProperty('isLoading');
    expect(instance.props()).toHaveProperty('setLoadingStatus');
    expect(instance.props()).toHaveProperty('showErrorAlert');
    expect(instance.props()).toHaveProperty('goBackWithAlert');
    expect(instance.props()).toHaveProperty('buyProVersion');
    expect(instance.props()).toHaveProperty('restorePurchases');
  });

  it('should handle setLoadingStatus call', () => {
    instance.props().setLoadingStatus(true);
    expect(instance.instance().props.isLoading).toBe(true);

    instance.props().setLoadingStatus(false);
    expect(instance.instance().props.isLoading).toBe(false);
  })

  it('should handle setIsPro call', () => {
    instance.props().setIsPro(true);
    expect(instance.instance().props.isPro).toBe(true);
  })

  it('should handle restore & buy with loading=true status', () => {
    instance.props().buyProVersion();
    expect(instance.instance().props.isLoading).toBe(true);

    instance.props().restorePurchases();
    expect(instance.instance().props.isLoading).toBe(true);
  })

  it('should go back with alert', () => {
    instance.props().goBackWithAlert();

    expect(mockFunction.mock.calls.length).toBe(2);
    expect(mockFunction.mock.calls[0][0]).toBe(undefined);
  })
});
