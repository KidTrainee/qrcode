import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  Image,
} from 'react-native-ui-lib';

import Scanner from '../scanner/ScannerViewContainer';
import History from '../history/HistoryViewContainer';
import NewCode from '../newCode/NewCodeViewContainer';
import Settings from '../settings/SettingViewContainer';
import GeneratedCode from '../generatedCode/GeneratedCodeViewContainer';
import ScannedCode from '../scannedCode/ScannedCodeViewContainer';

const TabNavigator = createBottomTabNavigator({
  Scanner,
  History,
  Generate: NewCode,
  Settings,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'History':
          iconName = 'history';
          break;
        case 'Settings':
          iconName = 'settings';
          break;
        case 'Generate':
          iconName = 'plus';
          break;
        default:
          iconName = 'qrcode';
      }

      if (focused) {
        iconName = `${iconName}-active`;
      }

      return (
        <Image
          assetGroup="tabbar-icons"
          assetName={iconName}
          resizeMode="contain"
          style={{
            height: 23,
            marginTop: 5,
          }}
        />
      );
    },
  }),
  tabBarOptions: {
    activeTintColor: '#302F2F',
    inactiveTintColor: '#302F2F',
    labelStyle: {
      fontFamily: 'Muli-Bold',
      fontSize: 10,
    },
    style: {
      height: 60,
      borderTopWidth: 0,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      paddingTop: 5,
      elevation: 3,
    },
  },
});

const AppNavigator = createStackNavigator({
  ScannedCode: {
    screen: ScannedCode,
    navigationOptions: ({ navigation }) => ({
      title: `Scanned Code`,
    }),
  },
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  GeneratedCode,
}, {
  initialRoute: 'TabNavigator',
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
