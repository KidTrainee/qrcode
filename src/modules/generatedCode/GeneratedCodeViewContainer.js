import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import GeneratedCodeView from './GeneratedCodeView';

export default compose(
  connect(
    state => ({
      codeCreatingState: state.newCode,
    }),
  ),
  withHandlers(() => {
    let _cameraRef = null;
    return {
      updateCameraRef: () => (ref) => {
        _cameraRef = ref;
      },
      handleShareButtonClick: () => (shareInstance) => {
        _cameraRef.capture().then((uri) => {
          shareInstance.open({ url: `file://${uri}` });
        });
      },
    };
  }),
)(GeneratedCodeView);
