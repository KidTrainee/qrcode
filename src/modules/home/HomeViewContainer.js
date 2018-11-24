import { compose, withState } from 'recompose';

import HomeView from './HomeView';

export default compose(
    withState('isFlashlightOn', 'toggleFlashlight', false),
)(HomeView);
