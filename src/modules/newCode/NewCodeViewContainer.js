import { compose, withState, withHandlers } from 'recompose';

import { codeTypesList } from './NewCodeState';
import NewCodeView from './NewCodeView';

export default compose(
  withState('activeCodeType', 'setCodeType', codeTypesList.TEXT),
  withState('fieldValues', 'setFielsValues', {}),
  withHandlers({
    updateField: props => (field, value) => {
      props.setFielsValues({
        ...props.fieldValues,
        [field]: value,
      });
    },
    changeCodeType: props => (nextCodeType) => {
      props.setCodeType(nextCodeType);
      props.setFielsValues({});
    },
  }),
)(NewCodeView);
