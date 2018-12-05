// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { removeItemFromHistory } from './HistoryState';
import HistoryView from './HistoryView';

export default compose(
  connect(
    state => ({
      items: state.history.items,
    }),
    dispatch => ({
      removeItemFromHistory: id => dispatch(removeItemFromHistory(id)),
    }),
  ),
)(HistoryView);
