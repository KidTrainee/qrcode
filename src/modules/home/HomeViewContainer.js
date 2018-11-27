import { compose, withState, withHandlers, hoistStatics } from 'recompose';

import HomeView from './HomeView';

const enhance = compose(
  withState('isFlashlightOn', 'setFlashlight', false),
  withState('qrcodeDetected', 'detectCode', false),
  withHandlers({
    toggleFlashlight: props => () => {
      props.setFlashlight(!props.isFlashlightOn);
    },
  }),
);

export default hoistStatics(enhance)(HomeView);