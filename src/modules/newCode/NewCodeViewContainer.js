import { compose, withState, hoistStatics } from 'recompose';

import NewCodeView from './NewCodeView';

const enhance =  compose(
    withState('codeInputValue', 'setCodeValue', ''),
    withState('codeTypeValue', 'setCodeType', 'QR Code'),
);

export default hoistStatics(enhance)(NewCodeView);
