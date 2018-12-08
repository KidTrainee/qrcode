// @flow
import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

import { generateQRValueFromState } from './GeneratedCodeState';
import { commonStyles } from '../../styles';
import { Button } from '../../components';

type Props = {
  navigation: {
    navigate: (string) => void,
    getParam: (string) => any,
  },
  settings: {
    backgroundColor: string,
    foregroundColor: string,
  },
  onCapture: (string) => void,
  updateQrcodeRef: (any) => void,
  handleShareButtonClick: (any) => void,
  goSettingsPage: () => void,
  isPro: boolean,
};

const windowWidth = Dimensions.get('window').width;

export default function GeneratedCodeView(props: Props) {
  const navigationParams = {
    codeType: props.navigation.getParam('codeType'),
    fieldValues: props.navigation.getParam('fieldValues'),
  };

  const codeValue = generateQRValueFromState(navigationParams);
  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <View>
        <View padding-15 style={{ marginHorizontal: -15, backgroundColor: props.settings.backgroundColor }}>
          <QRCode
            testID="view:qrcode"
            value={codeValue.length > 0 ? codeValue : ' '}
            size={windowWidth - 30}
            getRef={ref => props.updateQrcodeRef(ref)}
            color={props.settings.foregroundColor}
            backgroundColor={props.settings.backgroundColor}
          />
        </View>
        <View marginT-20 row>
          <View flex style={{ marginRight: 20 }}>
            <Button
              testID="button:customize"
              variant="white"
              radius={5}
              style={{ flexGrow: 1 }}
              onPress={!props.isPro ? props.goSettingsPage : props.goSettingsPage}
            >
              Customize
            </Button>
          </View>
          <View flex>
            <Button
              testID="button:share"
              onPress={() => props.handleShareButtonClick(Share)}
              radius={5}
              style={{ flexGrow: 1 }}
            >
              Share
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
