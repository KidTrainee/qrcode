
import { compose, withHandlers } from 'recompose';

import GeneratedCodeView from './GeneratedCodeView';

export default compose(
  withHandlers(() => {
    let _qrcodeRef = null;
    return {
      updateQrcodeRef: () => (ref) => {
        _qrcodeRef = ref;
      },
      handleShareButtonClick: () => (shareInstance) => {
        _qrcodeRef.toDataURL((data) => {
          shareInstance.open({ url: `data:image/png;base64,${data}` });
        });
      },
    };
  }),
)(GeneratedCodeView);
