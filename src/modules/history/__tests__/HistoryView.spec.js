/* eslint-disable */
import React from 'react';
import HistoryView from '../HistoryView';
import { shallow } from 'enzyme/build';
import moment from 'moment-timezone';

describe('History View', () => {
  it('should render with array of items', () => {
    moment.tz.setDefault('EST');
    const props = {
      navigation: {
        navigate: () => {},
      },
      items: [{ id: 1, data: 'qrcode', date: moment("2017-09-15 09:30:00") }],
      removeItemFromHistory: () => {},
    };

    const wrapper = shallow(
      <HistoryView {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  })

  it('should render without items', () => {
    const props = {
      navigation: {
        navigate: () => {},
      },
      items: [],
      removeItemFromHistory: () => {},
    };

    const wrapper = shallow(
      <HistoryView {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  })
});
