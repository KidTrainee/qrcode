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
import { RoundButton } from '../../components';

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
      <Modal
        onBackgroundPress={props.closeModal}
        animationType="fade"
        transparent={true}
        visible={props.isModalOpened}
        overlayBackgroundColor="rgba(96,107,195,0.5)"
        onRequestClose={() => {}}
      >
        <View bg-white centerH padding-15 style={styles.codeModal}>
          <View bg-blue paddingV-5 paddingH-15 style={{ borderRadius: 5 }}>
            <Text white>WEBSITE</Text>
          </View>
          <View marginV-20>
            <Text style={{ fontFamily: 'Muli-Light'}}>
              https://github.com/insiderdev/react-native-qrcode-app
            </Text>
          </View>
          <View row>
            <TouchableOpacity style={styles.modalButtonContainer}>
              <Text button>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonContainer}>
              <Text button>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonContainer}>
              <Text button>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomBarContainer} />
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
      <View
        style={styles.bottomBarButtonsContainer}
      >
        <View
          flex
          row
          padding-15
          style={{
            justifyContent: 'space-around',
          }}
        >
          <RoundButton iconName="flashlight"
            onPress={props.toggleFlashlight}
            style={[styles.button, props.isFlashlightOn && styles.flashlightButtonDark]}
          />
          <RoundButton iconName="plus" bigger onPress={props.onCodeScanned} style={[styles.button, { marginTop: -30}]} />
          <RoundButton iconName="history" style={styles.button} />
        </View>
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
  },
  scanAreaIcon: {
    maxWidth: windowWidth / 2 + 10,
    marginTop: -200,
  },
  flashlightButtonDark: {
    backgroundColor: colors.darkGray,
    shadowColor: colors.darkGray
  },
  bottomBarContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: -(windowWidth/2 + 20),
    left: 0,
    right: 0,
    height: windowWidth,
    width: windowWidth,
    backgroundColor: colors.white,
    shadowColor: '#696767',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: windowWidth,
    transform: [
      { scaleX: 2 }
    ],
  },
  bottomBarButtonsContainer: {
    zIndex: 2,
    position: 'absolute',
    bottom: -(windowWidth/2 + 20),
    left: 0,
    right: 0,
    height: windowWidth - 50,
    width: windowWidth,
    backgroundColor: colors.white,
  },
  codeModal: {
    marginTop: 150,
    marginHorizontal: 50,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modalButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    elevation: 3,
  },
});
