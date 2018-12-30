// @flow
import { Alert } from 'react-native';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import i18n from '../../translations';

import { removeItemFromHistory, clearHistory } from './HistoryState';
import HistoryView from './HistoryView';

export default compose(
  connect(
    state => ({
      items: state.history.items,
      isPro: state.app.isPro,
    }),
    dispatch => ({
      removeItemFromHistory: id => dispatch(removeItemFromHistory(id)),
      clearHistory: () => dispatch(clearHistory()),
    }),
  ),
  withHandlers({
    goPricingPage: props => () => {
      props.navigation.navigate('Pricing');
    },
    handleClearHistory: props => () => {
      Alert.alert(
        i18n.t('screens.history.cancelAlert.title'),
        i18n.t('screens.history.cancelAlert.message'),
        [
          { text: i18n.t('screens.history.cancelAlert.cancelButton'), onPress: () => {}, style: 'cancel' },
          { text: i18n.t('screens.history.cancelAlert.okButton'), onPress: props.clearHistory },
        ],
        { cancelable: true },
      );
    },
  }),
  lifecycle({
    componentDidMount() {
      firebase.analytics().setCurrentScreen('history', 'HistoryView');
    },
  }),
)(HistoryView);
