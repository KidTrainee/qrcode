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
  },
  onCapture: (string) => void,
  updateQrcodeRef: (any) => void,
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
      <View flex-1 center>
        <View style={{ backgroundColor: 'gray' }}>
          <QRCode
            value={codeValue.length > 0 ? codeValue : ' '}
            size={windowWidth - 30}
            getRef={ref => props.updateQrcodeRef(ref)}
          />
        </View>
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
