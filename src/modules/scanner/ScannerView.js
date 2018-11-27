import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { View, Modal, Text, TouchableOpacity } from 'react-native-ui-lib';
import { RNCamera } from 'react-native-camera';
import { Image } from 'react-native-ui-lib';

import { commonStyles, colors } from '../../styles';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
  toggleFlashlight: () => void,
  closeModal: () => void,
  isModalOpened: boolean,
  onCodeScanned: (string) => void,
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeView(props: Props) {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <RNCamera
        style={styles.cameraPreview}
        flashMode={props.isFlashlightOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        permissionDialogTitle="Permission to use camera"
        permissionDialogMessage="We need your permission to use your camera phone"
        onBarCodeRead={props.onCodeScanned}
      >
        <Image
          style={styles.scanAreaIcon}
          resizeMode="contain"
          assetGroup="icons"
          assetName="scan-area"
        />
      </RNCamera>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cameraPreview: {
    width: windowWidth,
    height: Platform.select({ ios: windowHeight + 50, android: windowHeight }),
    marginTop: Platform.select({ ios: -50, android: 0 }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAreaIcon: {
    maxWidth: windowWidth / 2 + 10,
    marginTop: -200,
  },
});
