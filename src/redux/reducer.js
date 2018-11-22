import { combineReducers } from 'redux';

import app from '../modules/AppState';
import home from '../modules/home/HomeState';
import history from '../modules/history/HistoryState';
import newCode from '../modules/newCode/NewCodeState';

export default combineReducers({
  app,
  home,
  history,
  newCode,
});
