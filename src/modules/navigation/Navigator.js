import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform, StatusBar } from 'react-native';
import {
  Image,
  TouchableOpacity,
} from 'react-native-ui-lib';

import { iphoneXorBigger } from '../scanner/ScannerView';
import { colors } from '../../styles';

import Scanner from '../scanner/ScannerViewContainer';
import History from '../history/HistoryViewContainer';
import NewCode from '../newCode/NewCodeViewContainer';
import Settings from '../settings/SettingViewContainer';
import GeneratedCode from '../generatedCode/GeneratedCodeViewContainer';
import ScannedCode from '../scannedCode/ScannedCodeViewContainer';
import Pricing from '../pricing/PricingViewContainer';

const tabbarCreatingFunction = Platform.select({
  ios: createBottomTabNavigator,
  android: createMaterialBottomTabNavigator,
});

const TabNavigator = tabbarCreatingFunction({
  Scanner,
  History,
  Generate: NewCode,
  Settings,
}, {
  ...Platform.OS === 'android' ? {
    barStyle: { backgroundColor: '#ffffff' },
  } : {},
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
            ...Platform.select({
              ios: { marginTop: 5 },
              android: {},
            }),
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
      elevation: 5,
      ...Platform.OS === 'ios' ? {
        paddingTop: 5,
        paddingBottom: iphoneXorBigger() ? 0 : 5,
      } : {},
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
  Pricing: {
    screen: Pricing,
    navigationOptions: () => ({
      title: 'Pricing',
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
      <TouchableOpacity testID="button:back" onPress={onPress} style={{ paddingLeft: 20 }}>
        <Image assetGroup="icons" assetName="back-icon" style={{ height: 15 }} resizeMode="contain" />
      </TouchableOpacity>
    ),
    headerStyle: {
      borderBottomWidth: 1,
      shadowOpacity: 0,
      borderBottomColor: colors.lightGray,
      ...Platform.select({
        ios: {},
        android: {
          marginTop: StatusBar.currentHeight,
        },
      }),
    },
    headerBackTitle: null,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
