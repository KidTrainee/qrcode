import React from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode';

import GeneratingForm from './CodeGeneratingForm';
import { BackButton, ButtonsGroup, Button } from '../../components';

import { commonStyles, colors } from '../../styles';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
  activeCodeType: string,
  updateField: (string) => void,
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const codeTypes = [
  { label: 'Text', icon: '' },
  { label: 'URL', icon: '' },
  { label: 'Email', icon: '' },
  { label: 'Tel', icon: '' },
  { label: 'Contact', icon: '' },
  { label: 'SMS', icon: '' },
  { label: 'Geo', icon: '' },
  { label: 'Event', icon: '' },
  { label: 'WiFi', icon: '' },
];

export default function NewCodeView(props: Props) {
  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <Text h1 marginB-25>Generate Code</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.typesContainer}>
        {codeTypes.map((codeType, index) =>
          <TouchableOpacity
            key={index} // it's normal if list is static
            onPress={() => props.changeCodeType(codeType.label)}
            style={[
              styles.typeContainer,
              index === codeTypes.length - 1 && { marginRight: 40 },
              codeType.label === props.activeCodeType && styles.activeCodeType
            ]}
          >
            <Text h3 white={codeType.label === props.activeCodeType}>{codeType.label}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View flex-1 style={styles.formWrapper}>
        <View>
          <GeneratingForm activeCodeType={props.activeCodeType} updateField={props.updateField} />
        </View>
        <Button onPress={() => props.navigation.navigate('GeneratedCode')} radius={5} variant="darkGray">Generate</Button>
      </View>
    </SafeAreaView>
  )
}

const codeTypeWidth = (windowWidth - 90) / 2.5;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 15,
    justifyContent: 'flex-start',
  },
  typesContainer: {
    maxHeight: codeTypeWidth + 10, // 5px * 2 vertival padding
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  typeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: codeTypeWidth,
    height: codeTypeWidth,
    marginRight: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  activeCodeType: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderColor: colors.primary,
  },
  formWrapper: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
});