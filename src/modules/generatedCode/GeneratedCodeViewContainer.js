// @flow
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle } from 'recompose';
import firebase from 'react-native-firebase';

import GeneratedCodeView from './GeneratedCodeView';

export default compose(
  connect(
    state => ({
      settings: state.settings,
      isPro: state.app.isPro,
    }),
  ),
  withHandlers(() => {
    let _qrcodeRef = {};
    return {
      goSettingsPage: props => () => {
        props.navigation.navigate('Settings');
      },
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
  lifecycle({
    componentDidMount() {
      firebase.analytics().setCurrentScreen('generated', 'GeneratedCodeView');
      firebase.analytics().logEvent('generate', {
        type: this.props.navigation.getParam('codeType'),
      });
    },
  }),
)(GeneratedCodeView);
