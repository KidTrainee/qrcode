import {
  compose, withState, withHandlers, lifecycle,
} from 'recompose';
import { Clipboard } from 'react-native';

import firebase from 'react-native-firebase';
import ScannedCodeView from './ScannedCodeView';

export default compose(
  withState('toastRef', 'setToastRef', null),
  withHandlers({
    copyToClipboard: props => (data: string) => {
      Clipboard.setString(data);
      if (props.toastRef) props.toastRef.show('Copied to clipboard!');
    },
  }),
  lifecycle({
    componentDidMount() {
      firebase.analytics().setCurrentScreen('scanned-code', 'ScannedCodeView');
    },
  }),
)(ScannedCodeView);
