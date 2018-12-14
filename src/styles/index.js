/**
 * @flow
 */
import { Typography, Colors, Assets } from 'react-native-ui-lib';
import { Dimensions, Platform } from 'react-native';

import colors from './colors';
import fonts from './fonts';
import commonStyles from './common';

const { width } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 350;

Colors.loadColors(colors);

Typography.loadTypographies({
  h1: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        fontFamily: 'Muli',
        fontWeight: 'bold',
      },
      android: {
        fontFamily: 'Muli-Bold',
      },
    }),
  },
  h2: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Muli-SemiBold',
  },
  h3: {
    fontSize: 16,
    lineHeight: 22,
    ...Platform.select({
      ios: {
        fontFamily: 'Muli',
        fontWeight: 'bold',
      },
      android: {
        fontFamily: 'Muli-Bold',
      },
    }),
  },
  h4: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Muli',
  },
  p: {
    fontSize: 12,
    lineHeight: 20,
    ...Platform.select({
      ios: {
        fontFamily: 'Muli',
        fontWeight: '300',
      },
      android: {
        fontFamily: 'Muli',
      },
    }),
  },
  button: {
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontFamily: 'Muli',
        fontWeight: 'bold',
      },
      android: {
        fontFamily: 'Muli-Bold',
      },
    }),
    color: colors.primary,
  },
  default: {
    fontFamily: 'Muli',
  },
  defaultLight: {
    fontFamily: 'Muli-Light',
  },
});

Assets.loadAssetsGroup('images', {
  'bottom-bar-background': require('../../assets/images/bottom_bar_background.png'),
  pricing: require('../../assets/images/pricing.png'),
});

Assets.loadAssetsGroup('icons', {
  plus: require('../../assets/icons/plus.png'),
  'back-icon': require('../../assets/icons/back-icon.png'),
  history: require('../../assets/icons/history.png'),
  flashlight: require('../../assets/icons/flashlight.png'),
  'scan-area': require('../../assets/icons/scan-area.png'),
  'flashlight-on': require('../../assets/icons/flashlight-on.png'),
  'flashlight-off': require('../../assets/icons/flashlight-off.png'),
  delete: require('../../assets/icons/delete.png'),
  check: require('../../assets/icons/check.png'),
  copy: require('../../assets/icons/copy.png'),
});

Assets.loadAssetsGroup('types', {
  text: require('../../assets/icons/types/text.png'),
  'text-white': require('../../assets/icons/types/text-white.png'),
  link: require('../../assets/icons/types/link.png'),
  'link-white': require('../../assets/icons/types/link-white.png'),
  email: require('../../assets/icons/types/email.png'),
  'email-white': require('../../assets/icons/types/email-white.png'),
  phone: require('../../assets/icons/types/phone.png'),
  'phone-white': require('../../assets/icons/types/phone-white.png'),
  sms: require('../../assets/icons/types/sms.png'),
  'sms-white': require('../../assets/icons/types/sms-white.png'),
  contact: require('../../assets/icons/types/contact.png'),
  'contact-white': require('../../assets/icons/types/contact-white.png'),
  geo: require('../../assets/icons/types/geo.png'),
  'geo-white': require('../../assets/icons/types/geo-white.png'),
  event: require('../../assets/icons/types/event.png'),
  'event-white': require('../../assets/icons/types/event-white.png'),
  wifi: require('../../assets/icons/types/wifi.png'),
  'wifi-white': require('../../assets/icons/types/wifi-white.png'),
});

Assets.loadAssetsGroup('tabbar-icons', {
  history: require('../../assets/icons/tabbar/history.png'),
  'history-active': require('../../assets/icons/tabbar/history-active.png'),
  plus: require('../../assets/icons/tabbar/plus.png'),
  'plus-active': require('../../assets/icons/tabbar/plus-active.png'),
  qrcode: require('../../assets/icons/tabbar/qrcode.png'),
  'qrcode-active': require('../../assets/icons/tabbar/qrcode-active.png'),
  settings: require('../../assets/icons/tabbar/settings.png'),
  'settings-active': require('../../assets/icons/tabbar/settings-active.png'),
});

const scale = (size: number): number => width / guidelineBaseWidth * size;

export {
  colors,
  fonts,
  scale,
  commonStyles,
};
