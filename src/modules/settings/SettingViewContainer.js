// @flow
import { connect } from 'react-redux';
import { compose, withStateHandlers, withHandlers } from 'recompose';

import { setSettingValue } from './SettingsState';
import SettingsView from './SettingsView';

export const enhance = compose(
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
  withHandlers({
    goPricingPage: props => () => {
      props.navigation.navigate('Pricing');
    },
    handleBackgroundColorPick: props => (color) => {
      props.setSettingValue('backgroundColor', color);
      props.toggleBackgroundColorModal();
    },
    handleForegroundColorPick: props => (color) => {
      props.setSettingValue('foregroundColor', color);
      props.toggleForegroundColorModal();
    },
  }),
);

export default enhance(SettingsView);
