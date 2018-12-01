import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import moment from 'moment';

import { codeTypesList, fieldTypesList } from '../newCode/NewCodeState';
import { commonStyles } from '../../styles';
import { Button } from '../../components';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
  onCapture: (string) => void,
};

const generateQRValueFromState = (state) => {
  const { codeType, fieldValues } = state;

  switch (codeType) {
    case codeTypesList.EMAIL:
      /* eslint-disable */
      const subject = fieldValues[fieldTypesList.EMAIL_SUBJECT];
      const encodedSubject = encodeURIComponent(subject.trim());

      const body = fieldValues[fieldTypesList.EMAIL_BODY];
      const encodedBody = encodeURIComponent(body.trim());
      /* eslint-enable */

      return `mailto:${fieldValues[fieldTypesList.EMAIL_TO]}?subject=${encodedSubject}&body=${encodedBody}`;
    case codeTypesList.SMS:
      return `SMSTO:${fieldValues[fieldTypesList.SMS_TO]}:${fieldValues[fieldTypesList.SMS_MESSAGE]}`;
    case codeTypesList.WIFI:
      return `WIFI:S:${fieldValues[fieldTypesList.WIFI_SSID]};
T:${fieldValues[fieldTypesList.WIFI_ENCRYPTION]};
P:${fieldValues[fieldTypesList.WIFI_PASSWORD]};;`;
    case codeTypesList.GEO:
      return `geo:${fieldValues[fieldTypesList.GEO_LONG]},${fieldValues[fieldTypesList.GEO_LAT]}`;
    case codeTypesList.CONTACT:
      return `BEGIN:VCARD
VERSION:4.0
N:${fieldValues[fieldTypesList.CONTACT_SURNAME]};${fieldValues[fieldTypesList.CONTACT_NAME]};;;
FN:${fieldValues[fieldTypesList.CONTACT_NAME]} ${fieldValues[fieldTypesList.CONTACT_SURNAME]}
TEL:${fieldValues[fieldTypesList.CONTACT_PHONE]}
EMAIL:${fieldValues[fieldTypesList.CONTACT_EMAIL]}
END:VCARD`;
    case codeTypesList.EVENT:
      return `BEGIN:VEVENT
SUMMARY:${fieldValues[fieldTypesList.EVENT_TITLE]}
LOCATION:${fieldValues[fieldTypesList.EVENT_LOCATION]}
DESCRIPTION:${fieldValues[fieldTypesList.EVENT_DESCRIPTION]}
DTSTART:${moment(fieldValues[fieldTypesList.EVENT_START]).format('YYYYMMDDThhmmss')}
DTEND:${moment(fieldValues[fieldTypesList.EVENT_END]).format('YYYYMMDDThhmmss')}
END:VEVENT`;
    default:
      return fieldValues[fieldTypesList.TEXT];
  }
};

const windowWidth = Dimensions.get('window').width;

export default function GeneratedCodeView(props: Props) {
  const navigationParams = {
    codeType: props.navigation.getParam('codeType'),
    fieldValues: props.navigation.getParam('fieldValues'),
  };

  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <View flex-1 center>
        <ViewShot
          ref={input => props.updateCameraRef(input)}
        >
          <View style={{ backgroundColor: 'gray' }}>
            <QRCode
              value={generateQRValueFromState(navigationParams)}
              size={windowWidth - 30}
              bgColor="black"
              fgColor="white"
            />
          </View>
        </ViewShot>
        <View marginT-20 row>
          <View flex style={{ marginRight: 20 }}>
            <Button
              onPress={() => props.handleShareButtonClick(Share)}
              radius={5}
              style={{ flexGrow: 1 }}
            >
            Share
            </Button>
          </View>
          <View flex>
            <Button
              variant="white"
              radius={5}
              style={{ flexGrow: 1 }}
              textColor="red"
              borderColor="red"
            >
              Customize
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 15,
  },
});
