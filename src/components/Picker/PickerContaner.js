import { compose, withState, withHandlers } from 'recompose';

import PickerView from './PickerView';

export default compose(
  withState('inputValue', 'setInputValue', ''),
  withState('isModalOpened', 'setModalState', false),
  withHandlers({
    handleSetValue: props => (value) => {
      props.onSetValue(value);
      props.setInputValue(value);
    },
  }),
)(PickerView);
