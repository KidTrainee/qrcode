import { combineReducers } from 'redux';

import app from '../modules/AppState';
import scanner from '../modules/scanner/ScannerState';
import history from '../modules/history/HistoryState';
import newCode from '../modules/newCode/NewCodeState';
import settings from '../modules/settings/SettingsState';

export default combineReducers({
  app,
  scanner,
  history,
  newCode,
  settings,
});
