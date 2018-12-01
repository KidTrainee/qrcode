import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { clearValues, updateField, setCodeType } from './NewCodeState';

import NewCodeView from './NewCodeView';

export default compose(
  connect(
    state => ({
      activeCodeType: state.newCode.codeType,
    }),
    dispatch => ({
      clearValues: () => dispatch(clearValues()),
      updateField: (field, value) => dispatch(updateField(field, value)),
      setCodeType: type => dispatch(setCodeType(type)),
    }),
  ),
  withHandlers({
    changeCodeType: props => (nextCodeType) => {
      props.setCodeType(nextCodeType);
      props.clearValues();
    },
  }),
)(NewCodeView);
