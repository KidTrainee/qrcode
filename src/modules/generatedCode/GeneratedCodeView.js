import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { Image } from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode';
import ViewShot from "react-native-view-shot";
import Share, {ShareSheet} from 'react-native-share';

import { commonStyles, colors } from '../../styles';
import { Button } from '../../components';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
  onCapture: (string) => void,
};

const generateQRValueFromState = state => {
  const { codeType, fieldValues } = state;

  if (['Text', 'URL', 'Email', 'Tel'].includes(codeType) ) {
    return fieldValues.text;
  }

  if (codeType === 'SMS') {
    return `SMSTO:${fieldValues.sms_to}:${fieldValues.sms_message}`
  }

  if (codeType === 'WiFi') {
    return `WIFI:S:${fieldValues.wifi_ssid};T:${fieldValues.wifi_encryption};P:${fieldValues.wifi_password};;`
  }

  if (codeType === 'Geo') {
    return `geo:${fieldValues.geo_long},${fieldValues.geo_lat}`
  }

  if (codeType === 'Contact') {
    return `BEGIN:VCARD
VERSION:4.0
N:${fieldValues.contact_surname};${fieldValues.contact_name};;;
FN:${fieldValues.contact_name} ${fieldValues.contact_surname}
TEL:${fieldValues.contact_phone}
EMAIL:${fieldValues.contact_email}
END:VCARD`
  }

  if (codeType === 'Event') {
    return `BEGIN:VEVENT
SUMMARY:${fieldValues.event_title}
LOCATION:${fieldValues.event_location}
DESCRIPTION:${fieldValues.event_description}
DTSTART:${fieldValues.event_start}
DTEND:${fieldValues.event_end}
END:VEVENT`
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GeneratedCodeView(props: Props) {
  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <View flex-1 center>
        <ViewShot
          ref={(input) => props.updateCameraRef(input)}
        >
          <View style={{backgroundColor: 'gray'}}>
            <QRCode
              value={generateQRValueFromState(props.codeCreatingState)}
              size={windowWidth - 30}
              bgColor='black'
              fgColor='white'/>
          </View>
        </ViewShot>
        <View marginT-20 row>
          <Button onPress={() => props.handleShareButtonClick(Share)} radius={5} style={{flexGrow: 1, marginRight: 20}}>Share</Button>
          <Button radius={5} style={{flexGrow: 1}}>Save</Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 15,
  }
});
