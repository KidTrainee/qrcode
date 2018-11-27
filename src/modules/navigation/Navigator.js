import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import Home from '../home/HomeViewContainer';
import History from '../history/HistoryViewContainer';
import NewCode from '../newCode/NewCodeViewContainer';

const AppNavigator = createStackNavigator({
  Home,
  History,
  NewCode,
}, {
  headerMode: 'float',
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
