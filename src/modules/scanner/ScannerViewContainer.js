import {
  compose, withState, withHandlers, lifecycle,
} from 'recompose';
import { connect } from 'react-redux';

import { addItemToHistory } from '../history/HistoryState';

import ScannerView from './ScannerView';

export default compose(
  connect(
    null,
    dispatch => ({
      addItemToHistory: data => dispatch(addItemToHistory(data)),
    }),
  ),
  withState('isFlashlightOn', 'setFlashlight', false),
  withState('focusedScreen', 'setFocusedScreen', ''),
  withHandlers({
    toggleFlashlight: props => () => {
      props.setFlashlight(!props.isFlashlightOn);
    },
    onCodeScanned: props => (codeData: { data: string }) => {
      props.addItemToHistory(codeData);
      props.navigation.navigate('ScannedCode', codeData);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { navigation } = this.props;
      navigation.addListener('willFocus', () => this.props.setFocusedScreen(true));
      navigation.addListener('willBlur', () => this.props.setFocusedScreen(false));
    },
  }),
)(ScannerView);
