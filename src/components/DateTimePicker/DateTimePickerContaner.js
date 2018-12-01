import { compose, withState, withHandlers } from 'recompose';

import DateTimePickerView from './DateTimePickerView';

export default compose(
  withState('inputValue', 'setInputValue', ''),
  withState('isModalOpened', 'setModalState', false),
)(DateTimePickerView);
