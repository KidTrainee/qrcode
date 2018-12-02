import { compose, withState, withHandlers } from 'recompose';

import ScannerView from './ScannerView';

export default compose(
  withState('isFlashlightOn', 'setFlashlight', false),
  withState('isModalOpened', 'setIsModalOpened', false),
  withState('scannedData', 'setScannedData', ''),
  withHandlers({
    toggleFlashlight: props => () => {
      props.setFlashlight(!props.isFlashlightOn);
    },
    onCodeScanned: props => (codeData: { data: string }) => {
      props.setIsModalOpened(true);
      props.setScannedData(codeData.data);
    },
    closeModal: props => () => props.setIsModalOpened(false),
  }),
)(ScannerView);
