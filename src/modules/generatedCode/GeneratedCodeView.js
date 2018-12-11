// @flow
import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { SlidersColorPicker } from 'react-native-color';
import tinycolor from 'tinycolor2';

import { generateQRValueFromState } from './GeneratedCodeState';
import { commonStyles } from '../../styles';
import { Button } from '../../components';
import { generateCodePreviewColors } from '../settings/SettingsView';
import colors from '../../styles/colors';

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
  goPricingPage: () => void,
  toggleBackgroundColorModal: () => void,
  toggleForegroundColorModal: () => void,
  isBackgroundModalVisible: boolean,
  isForegroundModalVisible: boolean,
  toggleBackgroundColorModal: () => void,
  toggleForegroundColorModal: () => void,
  handleBackgroundColorPick: (string) => void,
  handleForegroundColorPick: (string) => void,
  isPro: boolean,
};

const windowWidth = Dimensions.get('window').width;

export default function GeneratedCodeView(props: Props) {
  const navigationParams = {
    codeType: props.navigation.getParam('codeType'),
    fieldValues: props.navigation.getParam('fieldValues'),
    raw: props.navigation.getParam('raw'),
    data: props.navigation.getParam('data'),
  };
  const recommendedColors = ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'];
  const codeValue = navigationParams.raw
    ? navigationParams.data
    : generateQRValueFromState(navigationParams);
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <ScrollView>
        <View marginT-25 padding-15 style={{ backgroundColor: props.settings.backgroundColor }}>
          <QRCode
            testID="view:qrcode"
            value={codeValue.length > 0 ? codeValue : ' '}
            size={windowWidth - 30}
            getRef={ref => props.updateQrcodeRef(ref)}
            color={props.settings.foregroundColor}
            backgroundColor={props.settings.backgroundColor}
          />
        </View>
        <View marginH-15 marginB-20>
          <View marginV-25>
            <View row spread>
              <View row centerV>
                <Text h2 marginB-5 style={styles.textNormal}>Background color</Text>
                {!props.isPro && (
                  <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4 marginL-5>
                    <Text white>Pro</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={!props.isPro ? props.goPricingPage : props.toggleBackgroundColorModal}
                style={[
                  styles.colorPreview,
                  generateCodePreviewColors(props.settings.backgroundColor),
                ]}
              />
            </View>
            <Text gray>Codes default background color</Text>
          </View>
          <View marginB-50>
            <View row spread>
              <View row centerV>
                <Text h2 marginB-5 style={styles.textNormal}>Foreground color</Text>
                {!props.isPro && (
                  <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4 marginL-5>
                    <Text white>Pro</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={!props.isPro ? props.goPricingPage : props.toggleForegroundColorModal}
                style={[
                  styles.colorPreview,
                  generateCodePreviewColors(props.settings.foregroundColor),
                ]}
              />
            </View>
            <Text gray>Codes default foreground color</Text>
          </View>
          <Button
            testID="button:share"
            onPress={() => props.handleShareButtonClick(Share)}
            radius={5}
          >
            Share
          </Button>
        </View>
        <SlidersColorPicker
          visible={props.isBackgroundModalVisible}
          color={tinycolor(props.settings.backgroundColor).toHsl()}
          returnMode="hex"
          onCancel={props.toggleBackgroundColorModal}
          onOk={props.handleBackgroundColorPick}
          swatches={recommendedColors}
          swatchesLabel="Recommended"
          okLabel="Done"
          cancelLabel="Cancel"
        />
        <SlidersColorPicker
          visible={props.isForegroundModalVisible}
          color={tinycolor(props.settings.foregroundColor).toHsl()}
          returnMode="hex"
          onCancel={props.toggleForegroundColorModal}
          onOk={props.handleForegroundColorPick}
          swatches={recommendedColors}
          swatchesLabel="Recommended"
          okLabel="Done"
          cancelLabel="Cancel"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textNormal: {
    fontWeight: '300',
  },
  settingsBlockContainer: {
    marginBottom: 25,
  },
  proLabel: {
    backgroundColor: colors.red,
  },
  colorPreview: {
    width: 25,
    height: 25,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
});
