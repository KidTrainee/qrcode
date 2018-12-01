import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { Platform } from 'react-native';
import {
  Image,
  TouchableOpacity,
} from 'react-native-ui-lib';

import { colors } from '../../styles';

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
    activeTintColor: '#242833',
    inactiveTintColor: '#8890A6',
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
      ...Platform.OS === 'android' && {
        paddingBottom: 5,
      },
    },
  },
});

const AppNavigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  ScannedCode: {
    screen: ScannedCode,
    navigationOptions: () => ({
      title: 'Scanned Code',
    }),
  },
  GeneratedCode: {
    screen: GeneratedCode,
    navigationOptions: () => ({
      title: 'New Code',
    }),
  },
}, {
  initialRoute: 'TabNavigator',
  defaultNavigationOptions: {
    headerTintColor: colors.darkBlue,
    headerTitleStyle: {
      fontFamily: 'Muli',
    },
    headerLeft: ({ onPress }) => (
      <TouchableOpacity onPress={onPress} style={{ paddingLeft: 20 }}>
        <Image assetGroup="icons" assetName="back-icon" style={{ height: 15 }} resizeMode="contain" />
      </TouchableOpacity>
    ),
    headerStyle: {
      borderBottomWidth: 1,
      shadowOpacity: 0,
      borderBottomColor: colors.lightGray,
    },
    headerBackTitle: null,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
