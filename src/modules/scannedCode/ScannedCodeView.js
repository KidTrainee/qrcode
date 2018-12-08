// @flow
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Clipboard,
  Linking,
  Share,
} from 'react-native';
import openMap from 'react-native-open-maps';
import {
  View,
  Text,
  TextInput,
} from 'react-native-ui-lib';

import { commonStyles, colors } from '../../styles';
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
  <Button onPress={() => Share.share({ message: props.data })}>share</Button>
);
export const CopyButton = (props: { data: any }) => (
  <Button onPress={() => Clipboard.setString(props.data)}>copy</Button>
);
export const OpenButton = (props: { data: any, children?: string }) => (
  <Button onPress={() => openLink(props.data)}>{props.children || 'open'}</Button>
);

export const OpenInMaps = (props: { longitude: number, latitude: number }) => (
  <Button onPress={() => openMap({ latitude: props.latitude, longitude: props.longitude })}>Open in Maps</Button>
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
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar translucent={false} backgroundColor={colors.lightBlue} />
      <ScrollView contentContainerStyle={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
        <View>
          <Text h1 center marginB-20>{parsedString.type}</Text>
          { parsedString.fields.map(field => (
            <TextInput
              key={field.title.replace(' ', '')}
              text70
              floatingPlaceholder
              placeholder={capitalizeFirstLetter(field.title)}
              value={field.value || '--'}
              editable={false}
              disabledColor={colors.darkBlue}
              floatingPlaceholderColor={colors.darkGray}
            />
          ))}
        </View>

        <View flex bottom paddingB-30>
          { parsedString.type === codeTypesList.TEXT && (
            <View row centerH>
              <CopyButton data={data} />
              <ShareButton data={data} />
            </View>
          )}
          { parsedString.type === codeTypesList.URL && (
            <View row centerH spread>
              <OpenButton data={data} />
              <CopyButton data={data} />
              <ShareButton data={data} />
            </View>
          )}
          { parsedString.type === codeTypesList.EMAIL && (
            <View row centerH spread>
              <OpenButton data={data}>send</OpenButton>
            </View>
          )}
          { parsedString.type === codeTypesList.TEL && (
            <View row centerH spread>
              <OpenButton data={data}>call</OpenButton>
              <CopyButton data={fieldsDict.number} />
              <ShareButton data={fieldsDict.number} />
            </View>
          )}
          { parsedString.type === codeTypesList.SMS && (
            <View row centerH spread>
              <OpenButton data={data}>send</OpenButton>
            </View>
          )}
          { parsedString.type === codeTypesList.GEO && (
            <View row centerH spread>
              <OpenInMaps longitude={Number(fieldsDict.longitude)} latitude={Number(fieldsDict.latitude)} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
