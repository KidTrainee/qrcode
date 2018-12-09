import { compose, withState, withHandlers } from 'recompose';
import { Clipboard } from 'react-native';

import ScannedCodeView from './ScannedCodeView';

export default compose(
  withState('toastRef', 'setToastRef', null),
  withHandlers({
    copyToClipboard: props => (data: string) => {
      Clipboard.setString(data);
      if (props.toastRef) props.toastRef.show('Copied to clipboard!');
    },
  }),
)(ScannedCodeView);
