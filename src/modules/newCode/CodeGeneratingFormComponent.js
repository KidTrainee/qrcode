// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

import { codeTypesList, fieldTypesList } from './NewCodeState';
import { colors } from '../../styles';

type Props = {
  activeCodeType: string,
  updateField: (string) => void,
}

const generateTextInput = (key, onChange, placeholder, keyboardType) => (
  <TextInput
    key={key}
    onChangeText={onChange}
    style={styles.textInput}
    placeholder={placeholder}
    keyboardType={keyboardType}
  />
);
const CodeGeneratingForm = (props: Props) => {
  switch (props.activeCodeType) {
    case codeTypesList.URL:
      return generateTextInput(0, text => props.updateField(fieldTypesList.TEXT, text), 'URL');
    case codeTypesList.EMAIL:
      return generateTextInput(1, text => props.updateField(fieldTypesList.TEXT, `mailto:${text}`), 'Email');
    case codeTypesList.TEL:
      return generateTextInput(2, text => props.updateField(fieldTypesList.TEXT, `tel:${text}`), 'Tel', 'numeric');
    case codeTypesList.SMS:
      return (
        <View>
          {generateTextInput(3, text => props.updateField(fieldTypesList.SMS_TO, text), 'Phone number')}
          {generateTextInput(4, text => props.updateField(fieldTypesList.SMS_MESSAGE, text), 'Message')}
        </View>
      );
    case codeTypesList.WIFI:
      return (
        <View>
          {generateTextInput(5, text => props.updateField(fieldTypesList.WIFI_SSID, text), 'SSID')}
          {generateTextInput(
            6,
            text => props.updateField(fieldTypesList.WIFI_ENCRYPTION, text),
            'Encryption (WPA or WEP)',
          )}
          {generateTextInput(7, text => props.updateField(fieldTypesList.WIFI_PASSWORD, text), 'Password')}
        </View>
      );
    case codeTypesList.GEO:
      return (
        <View>
          {generateTextInput(8, text => props.updateField(fieldTypesList.GEO_LONG, text), 'Long')}
          {generateTextInput(9, text => props.updateField(fieldTypesList.GEO_LAT, text), 'Lat')}
        </View>
      );
    case codeTypesList.CONTACT:
      return (
        <View>
          <View row>
            <View flex style={styles.textInputMargin}>
              {generateTextInput(10, text => props.updateField(fieldTypesList.CONTACT_NAME, text), 'First Name')}
            </View>
            <View flex>
              {generateTextInput(11, text => props.updateField(fieldTypesList.CONTACT_SURNAME, text), 'Last Name')}
            </View>
          </View>
          {generateTextInput(12, text => props.updateField(fieldTypesList.CONTACT_PHONE, text), 'Phone')}
          {generateTextInput(13, text => props.updateField(fieldTypesList.CONTACT_EMAIL, text), 'Email')}
          {generateTextInput(14, text => props.updateField(fieldTypesList.CONTACT_ADDRESS, text), 'Address')}
        </View>
      );
    case codeTypesList.EVENT:
      return (
        <View>
          {generateTextInput(15, text => props.updateField(fieldTypesList.EVENT, text), 'Title')}
          {generateTextInput(16, text => props.updateField(fieldTypesList.EVENT_DESCRIPTION, text), 'Description')}
          {generateTextInput(17, text => props.updateField(fieldTypesList.EVENT_LOCATION, text), 'Location')}
          <View row>
            <View flex style={styles.textInputMargin}>
              {generateTextInput(18, text => props.updateField(fieldTypesList.EVENT_START, text), 'Start')}
            </View>
            <View flex>
              {generateTextInput(19, text => props.updateField(fieldTypesList.EVENT_END, text), 'End')}
            </View>
          </View>
        </View>
      );
    default:
      return generateTextInput(20, text => props.updateField(fieldTypesList.TEXT, text), 'Text');
  }
};

const styles = StyleSheet.create({
  textInput: {
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    padding: 20,
    color: colors.darkGray,
    marginBottom: 15,
  },
  textInputMargin: {
    marginRight: 20,
  },
});

export default CodeGeneratingForm;
