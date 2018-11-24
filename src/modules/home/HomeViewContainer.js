import { compose, withState, withHandlers } from 'recompose';

import HomeView from './HomeView';

export default compose(
    withState('isFlashlightOn', 'setFlashlight', false),
    withHandlers({
        toggleFlashlight: props => () => {
          props.setFlashlight(!props.isFlashlightOn);
        },
      }),
)(HomeView);
