import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { View } from 'react-native-ui-lib';
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
  focusedScreen: boolean,
  isFlashlightOn: boolean,
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeView(props: Props) {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar
        backgroundColor={colors.primary}
      />
      <View flex>
        { props.focusedScreen ? (
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

            <TouchableOpacity
              onPress={props.toggleFlashlight}
              style={[styles.flashlightButton, props.isFlashlightOn && styles.flashlightButtonOn]}
            >
              <Image
                style={styles.flashlightIcon}
                resizeMode="contain"
                assetGroup="icons"
                assetName={props.isFlashlightOn ? 'flashlight-on' : 'flashlight-off'}
              />
            </TouchableOpacity>
          </RNCamera>
        ) : <View flex />}
      </View>
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
    position: 'relative',
  },
  scanAreaIcon: {
    maxWidth: windowWidth / 2 + 10,
    marginTop: -200,
  },
  flashlightButton: {
    position: 'absolute',
    bottom: Platform.select({ android: 100, ios: 150 }),
    width: 100,
    height: 40,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
  },
  flashlightButtonOn: {
    opacity: 0.6,
    borderWidth: 2,
  },
  flashlightIcon: {
    height: 20,
  },
});
