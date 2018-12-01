import { compose, withState, withHandlers, lifecycle } from 'recompose';

import ScannerView from './ScannerView';

export default compose(
    withState('isFlashlightOn', 'setFlashlight', false),
    withState('focusedScreen', 'setFocusedScreen', ''),
    withHandlers({
      toggleFlashlight: props => () => {
        props.setFlashlight(!props.isFlashlightOn);
      },
      onCodeScanned: props => (codeData: { data: string }) => {
        props.navigation.navigate('ScannedCode', codeData);
      },
      closeModal: props => () => props.setIsModalOpened(false),
    }),
  lifecycle({
    componentDidMount() {
      const { navigation } = this.props;
      navigation.addListener('willFocus', () =>
        this.props.setFocusedScreen(true)
      );
      navigation.addListener('willBlur', () =>
        this.props.setFocusedScreen(false)
      );
    }
  }),
)(ScannerView);
