// @flow
import { Alert } from 'react-native';
import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

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
        'Are you sure?',
        'This action will remove all your scanned codes',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'OK', onPress: props.clearHistory },
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
