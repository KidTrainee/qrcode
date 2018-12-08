// @flow
import { Alert } from 'react-native';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { removeItemFromHistory, clearHistory } from './HistoryState';
import HistoryView from './HistoryView';

export default compose(
  connect(
    state => ({
      items: state.history.items,
    }),
    dispatch => ({
      removeItemFromHistory: id => dispatch(removeItemFromHistory(id)),
      clearHistory: () => dispatch(clearHistory()),
    }),
  ),
  withHandlers({
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
)(HistoryView);
