// @flow
import { Keyboard, DatePickerAndroid, TimePickerAndroid } from 'react-native';
import { compose, withState, withHandlers } from 'recompose';

import PickerView from './PickerView';

import type { PickerProps } from './PickerView';

export default compose(
  withState('inputValue', 'setInputValue', ''),
  withState('isModalOpened', 'setModalState', false),
  withHandlers({
    handleSetValue: (props: PickerProps) => (value: string): void => {
      props.onSetValue(value);
      props.setInputValue(value);
    },
  }),
  withHandlers({
    toggleModal: props => () => {
      Keyboard.dismiss();
      props.setModalState(!props.isModalOpened);
    },
    // eslint-disable-next-line consistent-return
    openAndroidDatepicker: props => async () => {
      try {
        Keyboard.dismiss();
        const DatePickerData = await DatePickerAndroid.open({
          date: new Date(),
          minDate: props.minimumDate,
        });
        const TimePickerData = await TimePickerAndroid.open({
          hour: 12,
          minute: 0,
          is24Hour: true,
        });
        // $$FlowFixMe
        if (DatePickerData.action !== DatePickerAndroid.dismissedAction
          // $$FlowFixMe
          && TimePickerData.action !== TimePickerAndroid.dismissedAction) {
          const { year, month, day } = DatePickerData;
          const { hour, minute } = TimePickerData;
          const date = new Date(year, month, day, hour, minute);

          props.handleSetValue(date);
        }
      } catch (err) {
        return null;
      }
    },
  }),
)(PickerView);
