import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { View, Image, Text } from 'react-native-ui-lib';
import { RNCamera } from 'react-native-camera';

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
  scanInProgress: boolean,
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeView(props: Props) {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar
        backgroundColor={colors.lightBlue}
      />
      <View flex>
        { props.focusedScreen ? (
          <RNCamera
            style={styles.cameraPreview}
            flashMode={props.isFlashlightOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            permissionDialogTitle="Permission to use camera"
            permissionDialogMessage="We need your permission to use your camera phone"
            onBarCodeRead={props.onCodeScanned}
            // onGoogleVisionBarcodesDetected={Platform.select({
            //   android: props.onCodeScanned,
            //   ios: null,
            // })}
            notAuthorizedView={(
              <View flex centerV centerH paddingH-30>
                <Text h2 darkBlue center>Camera access has not been granted :(</Text>
                <Text marginT-15 p center>The only thing you could do is to reinstall
                  the app and click allow when the app will ask you for camera permissions.
                  We promise that we use it for code scanning purposes only!
                </Text>
              </View>
            )}
          >
            <Image
              style={styles.scanAreaIcon}
              resizeMode="contain"
              assetGroup="icons"
              assetName="scan-area"
              testID="image:code-scan-area"
            />

            <TouchableOpacity
              onPress={props.toggleFlashlight}
              style={[styles.flashlightButton, props.isFlashlightOn && styles.flashlightButtonOn]}
              testID="button:flashlight"
            >
              {props.isFlashlightOn && (
                <Image
                  testID="image:flashlight-icon-on"
                  style={styles.flashlightIcon}
                  resizeMode="contain"
                  assetGroup="icons"
                  assetName="flashlight-on"
                />
              )}
              {!props.isFlashlightOn && (
                <Image
                  testID="image:flashlight-icon-off"
                  style={styles.flashlightIcon}
                  resizeMode="contain"
                  assetGroup="icons"
                  assetName="flashlight-off"
                />
              )}
            </TouchableOpacity>
          </RNCamera>
        ) : <View flex />}
      </View>
    </SafeAreaView>
  );
}

export function iphoneXorBigger() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowHeight >= 812 || windowWidth >= 812)
  );
}

const styles = StyleSheet.create({
  cameraPreview: {
    width: windowWidth,
    height: Platform.select({ ios: windowHeight + 50, android: windowHeight }),
    marginTop: Platform.select({ ios: -50, android: -1 * StatusBar.currentHeight }),
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
    bottom: Platform.select({ android: 80, ios: iphoneXorBigger() ? 170 : 115 }),
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
