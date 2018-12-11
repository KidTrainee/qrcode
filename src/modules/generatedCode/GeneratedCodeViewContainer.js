// @flow
import { connect } from 'react-redux';
import {
  compose, withHandlers, withStateHandlers, lifecycle,
} from 'recompose';
import firebase from 'react-native-firebase';

import GeneratedCodeView from './GeneratedCodeView';
import { setSettingValue } from '../settings/SettingsState';

export default compose(
  connect(
    state => ({
      settings: state.settings,
      isPro: state.app.isPro,
    }),
    dispatch => ({
      setSettingValue: (setting, value) => dispatch(setSettingValue({ setting, value })),
    }),
  ),
  withStateHandlers(
    { isBackgroundModalVisible: false, isForegroundModalVisible: false },
    {
      toggleBackgroundColorModal: ({ isBackgroundModalVisible }) => () => ({
        isBackgroundModalVisible: !isBackgroundModalVisible,
      }),
      toggleForegroundColorModal: ({ isForegroundModalVisible }) => () => ({
        isForegroundModalVisible: !isForegroundModalVisible,
      }),
    },
  ),
  withHandlers(() => {
    let _qrcodeRef = {};
    return {
      goPricingPage: props => () => {
        props.navigation.navigate('Pricing');
      },
      updateQrcodeRef: () => (ref) => {
        _qrcodeRef = ref;
      },
      handleShareButtonClick: () => (shareInstance) => {
        _qrcodeRef.toDataURL((data) => {
          shareInstance.open({ url: `data:image/png;base64,${data}` });
        });
      },
      handleBackgroundColorPick: props => (color) => {
        props.setSettingValue('backgroundColor', color);
        props.toggleBackgroundColorModal();
      },
      handleForegroundColorPick: props => (color) => {
        props.setSettingValue('foregroundColor', color);
        props.toggleForegroundColorModal();
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
