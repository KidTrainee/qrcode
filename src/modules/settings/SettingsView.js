// @flow
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
  Platform,
} from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';
import tinycolor from 'tinycolor2';
import { SlidersColorPicker } from 'react-native-color';
import Rate from 'react-native-rate';

import { commonStyles, colors } from '../../styles';
import i18n from '../../translations';


type Props = {
  navigation: {
    navigate: (string) => void,
  },
  settings: {
    batch: boolean,
    vibrate: boolean,
    beep: boolean,
    history: boolean,
    duplicate: boolean,
    backgroundColor: string,
    foregroundColor: string,
  },
  goPricingPage: () => void,
  isBackgroundModalVisible: boolean,
  isForegroundModalVisible: boolean,
  toggleBackgroundColorModal: () => void,
  toggleForegroundColorModal: () => void,
  handleBackgroundColorPick: (string) => void,
  handleForegroundColorPick: (string) => void,
  setSettingValue: (string, any) => void,
  isPro: boolean,
};

export const generateCodePreviewColors = (color: string) => ({
  backgroundColor: color,
  borderColor: tinycolor(color).isLight()
    ? colors.lightGray
    : colors.black,
});

export const SettingSwitch = (props: {
  value: boolean,
  onChange: (string, boolean) => void,
  name: string,
  disabled?: boolean}) => (
    <Switch
      value={props.value}
      onValueChange={value => props.onChange(props.name, value)}
      disabled={props.disabled}
      testID="switch"
      trackColor={{
        true: Platform.select({
          android: colors.primaryGradientEnd,
          ios: colors.lightGray,
        }),
        false: colors.lightGray,
      }}
      thumbColor={colors.primaryGradientEnd}
    />
);

export default function SettingsView(props: Props) {
  const recommendedColors = ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'];
  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.lightBlue}
      />
      <View centerH marginB-25 marginT-10>
        <Text h1 darkBlue> {i18n.t('screens.settings.title', { defaultValue: i18n.t('tabs.settings') })}</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {!props.isPro && (
          <View marginB-25>
            <View row spread>
              <View flex>
                <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.offer')}</Text>
                <Text gray defaultLight>{i18n.t('screens.settings.offerDescription')}</Text>
              </View>
              <TouchableOpacity
                onPress={props.goPricingPage}
              >
                <Text h3 primary>{i18n.t('screens.settings.offerButton')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View marginB-25>
          <Text h2 marginB-10>{i18n.t('screens.settings.customization')}</Text>
          <View br10 paddingH-15 paddingT-25 paddingB-0 style={styles.settingBlock}>
            <View marginB-25>
              <View row spread>
                <View row centerV>
                  <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.background')}</Text>
                  {!props.isPro && (
                    <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4 marginL-5>
                      <Text white default>{i18n.t('other.pro')}</Text>
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
              <Text gray defaultLight>{i18n.t('screens.settings.backgroundDescription')}</Text>
            </View>
            <View marginB-25>
              <View row spread>
                <View row centerV>
                  <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.foreground')}</Text>
                  {!props.isPro && (
                    <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4 marginL-5>
                      <Text white default>{i18n.t('other.pro')}</Text>
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
              <Text gray defaultLight>{i18n.t('screens.settings.foregroundDescription')}</Text>
            </View>
          </View>
        </View>
        <View marginB-25>
          <Text h2 marginB-10>{i18n.t('screens.settings.general')}</Text>
          <View br10 paddingH-15 paddingT-25 paddingB-0 style={styles.settingBlock}>
            <View marginB-25>
              <View row spread centerV>
                <View row centerV>
                  <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.batch')}</Text>
                  {!props.isPro && (
                    <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4 marginL-5>
                      <Text white default>{i18n.t('other.pro')}</Text>
                    </View>
                  )}
                </View>
                <SettingSwitch
                  value={props.settings.batch}
                  onChange={!props.isPro ? props.goPricingPage : props.setSettingValue}
                  name="batch"
                />
              </View>
              <Text gray marginR-50 defaultLight>{i18n.t('screens.settings.batchDescription')}</Text>
            </View>
            <View marginB-25>
              <View row spread centerV>
                <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.vibrate')}</Text>
                <SettingSwitch
                  value={props.settings.vibrate}
                  onChange={props.setSettingValue}
                  name="vibrate"
                />
              </View>
              <Text gray marginR-50 defaultLight>{i18n.t('screens.settings.vibrateDescription')}</Text>
            </View>
            <View marginB-25>
              <View row spread centerV>
                <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.beep')}</Text>
                <SettingSwitch
                  value={props.settings.beep}
                  onChange={props.setSettingValue}
                  name="beep"
                />
              </View>
              <Text gray marginR-50 defaultLight>{i18n.t('screens.settings.beepDescription')}</Text>
            </View>
            <View marginB-25>
              <View row spread centerV>
                <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.beep')}</Text>
                <SettingSwitch
                  value={props.settings.history}
                  onChange={props.setSettingValue}
                  disabled={props.settings.batch}
                  name="history"
                />
              </View>
              <Text gray marginR-50 defaultLight>{i18n.t('screens.settings.historyDescription')}</Text>
            </View>
            <View marginB-25>
              <View row spread centerV>
                <Text h2 marginB-5 style={styles.textNormal}>{i18n.t('screens.settings.duplicate')}</Text>
                <SettingSwitch
                  value={props.settings.duplicate}
                  onChange={props.setSettingValue}
                  disabled={props.settings.batch}
                  name="duplicate"
                />
              </View>
              <Text gray marginR-50 defaultLight>{i18n.t('screens.settings.duplicateDescription')}</Text>
            </View>
          </View>
        </View>
        <View row marginB-25>
          <View flex marginR-20>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:apps@insider.io?subject=QRCode')}>
              <Text center gray default>{i18n.t('screens.settings.contact')}</Text>
            </TouchableOpacity>
          </View>
          <View flex>
            <TouchableOpacity>
              <Text
                center
                gray
                default
                onPress={() => Rate.rate({
                  AppleAppID: '1445350234',
                  GooglePackageName: 'io.insider.apps.qr',
                  preferInApp: true,
                  openAppStoreIfInAppFails: true,
                })}
              >
                {i18n.t('screens.settings.rate')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <SlidersColorPicker
        visible={props.isBackgroundModalVisible}
        color={tinycolor(props.settings.backgroundColor).toHsl()}
        returnMode="hex"
        onCancel={props.toggleBackgroundColorModal}
        onOk={props.handleBackgroundColorPick}
        swatches={recommendedColors}
        swatchesLabel={i18n.t('screens.generated.slider.label')}
        okLabel={i18n.t('screens.generated.slider.ok')}
        cancelLabel={i18n.t('screens.generated.slider.cancel')}
      />
      <SlidersColorPicker
        visible={props.isForegroundModalVisible}
        color={tinycolor(props.settings.foregroundColor).toHsl()}
        returnMode="hex"
        onCancel={props.toggleForegroundColorModal}
        onOk={props.handleForegroundColorPick}
        swatches={recommendedColors}
        swatchesLabel={i18n.t('screens.generated.slider.label')}
        okLabel={i18n.t('screens.generated.slider.ok')}
        cancelLabel={i18n.t('screens.generated.slider.cancel')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {},
  scrollView: Platform.select({
    ios: {
      marginHorizontal: -15,
      paddingHorizontal: 15,
    },
    android: {},
  }),
  textNormal: {
    fontWeight: '300',
  },
  settingsBlockContainer: {
    marginBottom: 25,
  },
  settingBlock: {
    backgroundColor: colors.white,
    shadowColor: colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
