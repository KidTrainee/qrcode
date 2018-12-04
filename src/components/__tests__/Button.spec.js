/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import {
  Button,
} from '../index';

describe('Button Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Button onPress={null} radius={5} textColor="primary">hello</Button>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onPress callback when pressed', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <Button onPress={onPress} radius={5} textColor="primary">hello</Button>,
    );

    wrapper.find('TouchableOpacity').first().simulate('press');

    expect(onPress).toHaveBeenCalled();
  });
});
