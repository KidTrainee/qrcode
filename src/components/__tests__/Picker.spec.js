/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import {
  Picker,
} from '../index';

describe('Picker Component', () => {
  it('renders as expected on datetime', () => {
    const props = {
      type: 'datetime',
      key: 1,
      placeholder: 'hello',
    };

    const wrapper = shallow(
      <Picker {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected on picker', () => {
    const props = {
      type: 'picker',
      key: 1,
      items: [
        { id: 1, label: 'hello' },
        { id: 2, label: 'man' },
      ],
    };

    const wrapper = shallow(
      <Picker {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
