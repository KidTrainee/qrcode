import { compose, withState, withHandlers } from 'recompose';

import HomeView from './HomeView';

export default compose(
    withState('isFlashlightOn', 'setFlashlight', false),
    withState('isModalOpened', 'setIsModalOpened', false),
    withHandlers({
      toggleFlashlight: props => () => {
        props.setFlashlight(!props.isFlashlightOn);
      },
      onCodeScanned: props => (codeData: { data: string }) => {
        props.setIsModalOpened(true);
      },
      closeModal: props => () => props.setIsModalOpened(false),
    }),
)(HomeView);
