import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { RNCamera } from 'react-native-camera';
import { Image } from 'react-native-ui-lib';

import { commonStyles, colors } from '../../styles';
import { RoundButton } from '../../components';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeView(props: Props) {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View
        style={styles.bottomBarContainer}
      >
      </View>
      <RNCamera
        style={styles.cameraPreview}
        flashMode={props.isFlashlightOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        onBarCodeRead={({ data }) => {
          console.log(data);
        }}
      >
        <Image
          style={styles.scanAreaIcon}
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
            onPress={() => props.toggleFlashlight(!props.isFlashlightOn)}
            style={props.isFlashlightOn && styles.flashlightButtonDark}
          />
          <RoundButton iconName="plus" bigger style={{ marginTop: -30}} />
          <RoundButton iconName="history" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cameraPreview: {
    width: windowWidth,
    height: windowHeight + 50 - windowWidth / 2,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanAreaIcon: {
    maxWidth: windowWidth / 2 + 10,
  }, 
  flashlightButtonDark: {
    backgroundColor: colors.darkGray,
    shadowColor: colors.darkGray
  },
  bottomBarContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: -windowWidth/2,
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
    bottom: -windowWidth/2,
    left: 0,
    right: 0,
    height: windowWidth - 50,
    width: windowWidth,
    backgroundColor: colors.white,
  },
});
