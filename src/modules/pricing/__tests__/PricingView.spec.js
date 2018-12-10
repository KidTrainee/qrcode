/* eslint-disable */
import React from 'react';
import PricingView from '../PricingView';
import { shallow } from 'enzyme/build';

describe('Pricing View', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <PricingView />,
    );
    expect(wrapper).toMatchSnapshot();
  })
});
