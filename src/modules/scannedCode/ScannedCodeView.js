// @flow
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
  Share,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import openMap from 'react-native-open-maps';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native-ui-lib';

import i18n from '../../translations';
import { colors } from '../../styles';
import { parseScannedString } from './ScannedCodeState';
import { Button } from '../../components';
import { codeTypesList } from '../newCode/NewCodeState';

type Props = {
  navigation: {
    navigate: (string) => void,
    state: {
      params: {
        data: any,
      }
    }
  },
  setToastRef: (any) => void,
  copyToClipboard: (string) => any,
  toastRef: any,
  isPro: boolean,
  goPricingPage: () => void,
  addToCalendar: (any) => void,
  addToContacts: (any) => void,
  goGeneratedCodePage: () => void,
};

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export function openLink(url: string): Promise<any> {
  return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return false;
    }
    return Linking.openURL(url);
  }).catch();
}

export const ShareButton = (props: { data: any }) => (
  <Button radius={5} onPress={() => Share.share({ message: props.data })}>Share</Button>
);
export const CopyButton = (props: {
  data: any, copyToClipboard: (string) => void,
}) => (
  <Button
    radius={5}
    onPress={() => props.copyToClipboard(props.data)}
  >
    Copy
  </Button>
);
export const OpenButton = (props: { data: any, children?: string }) => (
  <Button radius={5} onPress={() => openLink(props.data)}>{props.children || 'Open'}</Button>
);

export const OpenInMaps = (props: { longitude: number, latitude: number }) => (
  <Button radius={5} onPress={() => openMap({ latitude: props.latitude, longitude: props.longitude })}>
    Open in Maps
  </Button>
);

export const CustomInput = (props: any) => (
  <View>
    <TextInput
      {...props}
      floatingPlaceholderColor={colors.darkGray}
    />
    <TouchableOpacity
      onPress={() => props.copyToClipboard(props.value)}
      style={styles.customInputContainer}
    >
      <Image
        style={styles.copyIcon}
        resizeMode="contain"
        assetGroup="icons"
        assetName="copy"
      />
    </TouchableOpacity>
  </View>
);

// eslint-disable-next-line no-unused-vars
export default function ScannedCodeView(props: Props) {
  const data = props.navigation.state.params.data || '';
  const parsedString = parseScannedString(data);

  const fieldsDict = {};
  parsedString.fields.forEach((field) => {
    fieldsDict[field.title.replace(' ', '')] = field.value;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar translucent={false} backgroundColor={colors.lightBlue} />
      <View flex>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ marginTop: 20, paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View>
            <Text h1 center marginB-20>{parsedString.type}</Text>
            { parsedString.fields.map(field => (
              <CustomInput
                key={field.title.replace(' ', '')}
                text70
                floatingPlaceholder
                placeholder={capitalizeFirstLetter(field.title)}
                value={field.value || '--'}
                editable={false}
                disabledColor={colors.darkBlue}
                floatingPlaceholderColor={colors.darkGray}
                copyToClipboard={props.copyToClipboard}
                multiline
              />
            ))}
          </View>
        </ScrollView>
        <View paddingH-20>
          { parsedString.type === codeTypesList.EVENT && (
            <View>
              <Button radius={5} onPress={() => props.addToCalendar(fieldsDict)}>
                Add to Calendar
              </Button>
            </View>
          )}
          { parsedString.type === codeTypesList.TEXT && (
            <View row centerH style={{ justifyContent: 'space-around' }}>
              <View flex marginR-20>
                <CopyButton copyToClipboard={props.copyToClipboard} data={data} />
              </View>
              <View flex>
                <ShareButton data={data} />
              </View>
            </View>
          )}
          { parsedString.type === codeTypesList.URL && (
            <View row>
              <View flex marginR-20>
                <OpenButton data={data} />
              </View>
              <View flex marginR-20>
                <CopyButton copyToClipboard={props.copyToClipboard} data={data} />
              </View>
              <View flex>
                <ShareButton data={data} />
              </View>
            </View>
          )}
          { parsedString.type === codeTypesList.EMAIL && (
            <View>
              <OpenButton data={`mailto:${fieldsDict.to}?subject=${fieldsDict.subject}&body=${fieldsDict.body}`}>
                Send
              </OpenButton>
            </View>
          )}
          { parsedString.type === codeTypesList.CONTACT && (
            <View row>
              <View flex marginR-20>
                <OpenButton data={`tel:${fieldsDict.phone}`}>Сall</OpenButton>
              </View>
              <View flex marginR-20>
                <OpenButton data={`mailto:${fieldsDict.email}`}>Email</OpenButton>
              </View>
              <View flex>
                <Button radius={5} onPress={() => props.addToContacts(fieldsDict)}>Save</Button>
              </View>
            </View>
          )}
          { parsedString.type === codeTypesList.TEL && (
            <View row>
              <View flex marginR-20>
                <OpenButton data={data}>Call</OpenButton>
              </View>
              <View flex marginR-20>
                <CopyButton copyToClipboard={props.copyToClipboard} data={fieldsDict.number} />
              </View>
              <View flex>
                <ShareButton data={fieldsDict.number} />
              </View>
            </View>
          )}
          { parsedString.type === codeTypesList.SMS && (
            <View>
              <OpenButton
                data={`sms:${fieldsDict.to}${Platform.select({ ios: '&', android: '?' })}body=${fieldsDict.message}`}
              >
                Send
              </OpenButton>
            </View>
          )}
          { parsedString.type === codeTypesList.GEO && (
            <View>
              <OpenInMaps longitude={Number(fieldsDict.longitude)} latitude={Number(fieldsDict.latitude)} />
            </View>
          )}
          <TouchableOpacity
            style={styles.showQrCodeButton}
            onPress={props.isPro ? props.goGeneratedCodePage : props.goPricingPage}
          >
            <Text default gray>{i18n.t('screens.scanned.show')}&nbsp;</Text>
            {!props.isPro && (
              <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4>
                <Text white>{i18n.t('other.pro')}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Toast
        positionValue={300}
        ref={(ref) => {
          if (!props.toastRef && ref) {
            props.setToastRef(ref);
          }
        }}
        style={{ backgroundColor: colors.lightGray }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customInputContainer: {
    position: 'absolute',
    right: 0,
    bottom: 25,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  copyIcon: { height: 40, width: 25 },
  showQrCodeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
  },
  proLabel: {
    backgroundColor: colors.red,
  },
});
