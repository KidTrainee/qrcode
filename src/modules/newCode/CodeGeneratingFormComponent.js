// @flow
import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

import i18n from '../../translations';
import { codeTypesList, fieldTypesList } from './NewCodeState';
import { Input, Picker } from '../../components';

type Props = {
  activeCodeType: string,
  updateField: (string, string) => void,
  fieldValues: any,
}

const generateTextInput = (
  key: number,
  onChange: (string) => void,
  placeholder: string,
  keyboardType: string = 'default',
  secureTextEntry: boolean = false,
  multiline: boolean = false,
) => (
  <Input
    testID={`input:${placeholder.toLocaleLowerCase().replace(' ', '-')}`}
    key={key}
    onChangeText={onChange}
    placeholder={placeholder}
    keyboardType={keyboardType}
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"
    multiline={multiline}
    autoCorrect={false}
  />
);

const CodeGeneratingForm = (props: Props) => {
  switch (props.activeCodeType) {
    case codeTypesList.URL:
      return generateTextInput(
        0,
        text => props.updateField(fieldTypesList.TEXT, text),
        i18n.t('screens.generate.fieldsNames.url'),
      );
    case codeTypesList.EMAIL:
      return (
        <View>
          {generateTextInput(
            1,
            text => props.updateField(fieldTypesList.EMAIL_TO, text),
            i18n.t('screens.generate.fieldsNames.emailTo'),
          )}
          {generateTextInput(
            21,
            text => props.updateField(fieldTypesList.EMAIL_SUBJECT, text),
            i18n.t('screens.generate.fieldsNames.emailSubject'),
          )}
          {generateTextInput(
            22,
            text => props.updateField(fieldTypesList.EMAIL_BODY, text),
            i18n.t('screens.generate.fieldsNames.emailBody'),
            'default',
            false,
            true)
          }
        </View>
      );
    case codeTypesList.TEL:
      return generateTextInput(
        2,
        text => props.updateField(fieldTypesList.TEXT, `tel:${text}`),
        i18n.t('screens.generate.fieldsNames.tel'),
        'numeric',
      );
    case codeTypesList.SMS:
      return (
        <View>
          {generateTextInput(
            3,
            text => props.updateField(fieldTypesList.SMS_TO, text),
            i18n.t('screens.generate.fieldsNames.smsTo'),
          )}
          {generateTextInput(
            4,
            text => props.updateField(fieldTypesList.SMS_MESSAGE, text),
            i18n.t('screens.generate.fieldsNames.emailBody'),
            'default',
            false,
            true,
          )}
        </View>
      );
    case codeTypesList.WIFI:
      return (
        <View>
          {generateTextInput(
            5,
            text => props.updateField(fieldTypesList.WIFI_SSID, text),
            i18n.t('screens.generate.fieldsNames.wifiSsid'),
          )}
          {Platform.OS === 'ios' ? (
            <React.Fragment>
              <Picker
                title="Pick encryption type"
                placeholder={i18n.t('screens.generate.fieldsNames.wifiEncryption')}
                onSetValue={text => props.updateField(fieldTypesList.WIFI_ENCRYPTION, text)}
                items={[
                  { id: 1, label: 'None', value: '' },
                  { id: 2, label: 'WEP', value: 'WEP' },
                  { id: 3, label: 'WPA/WPA2', value: 'WPA' },
                ]}
              />
              {generateTextInput(
                7,
                text => props.updateField(fieldTypesList.WIFI_PASSWORD, text),
                i18n.t('screens.generate.fieldsNames.wifiPassword'),
                'default',
                true,
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {generateTextInput(
                7,
                text => props.updateField(fieldTypesList.WIFI_PASSWORD, text),
                i18n.t('screens.generate.fieldsNames.wifiPassword'),
                'default',
                true,
              )}
              <Text marginB-20 marginT-15 defaultLight darkGray>Encryption</Text>
              <Picker
                title={i18n.t('screens.generate.fieldsNames.wifiEncryptionTitle')}
                placeholder={i18n.t('screens.generate.fieldsNames.wifiEncryption')}
                onSetValue={text => props.updateField(fieldTypesList.WIFI_ENCRYPTION, text)}
                items={[
                  { id: 1, label: 'None', value: '' },
                  { id: 2, label: 'WEP', value: 'WEP' },
                  { id: 3, label: 'WPA/WPA2', value: 'WPA' },
                ]}
              />
            </React.Fragment>
          )}
        </View>
      );
    case codeTypesList.GEO:
      return (
        <View>
          {generateTextInput(
            8,
            text => props.updateField(fieldTypesList.GEO_LONG, text),
            i18n.t('screens.generate.fieldsNames.geoLong'),
            'numeric',
          )}
          {generateTextInput(
            9,
            text => props.updateField(fieldTypesList.GEO_LAT, text),
            i18n.t('screens.generate.fieldsNames.geoLat'),
            'numeric',
          )}
        </View>
      );
    case codeTypesList.CONTACT:
      return (
        <View>
          <View row>
            <View flex style={styles.textInputMargin}>
              {generateTextInput(
                10,
                text => props.updateField(fieldTypesList.CONTACT_NAME, text),
                i18n.t('screens.generate.fieldsNames.contactName'),
              )}
            </View>
            <View flex>
              {generateTextInput(
                11,
                text => props.updateField(fieldTypesList.CONTACT_SURNAME, text),
                i18n.t('screens.generate.fieldsNames.contactSurname'),
              )}
            </View>
          </View>
          {generateTextInput(
            12,
            text => props.updateField(fieldTypesList.CONTACT_PHONE, text),
            i18n.t('screens.generate.fieldsNames.contactPhone'),
          )}
          {generateTextInput(
            13,
            text => props.updateField(fieldTypesList.CONTACT_EMAIL, text),
            i18n.t('screens.generate.fieldsNames.contactEmail'),
          )}
        </View>
      );
    case codeTypesList.EVENT:
      return (
        <View>
          {generateTextInput(
            15,
            text => props.updateField(fieldTypesList.EVENT_TITLE, text),
            i18n.t('screens.generate.fieldsNames.eventTitle'),
          )}
          {generateTextInput(
            16,
            text => props.updateField(fieldTypesList.EVENT_DESCRIPTION, text),
            i18n.t('screens.generate.fieldsNames.eventDescription'),
          )}
          {generateTextInput(
            17,
            text => props.updateField(fieldTypesList.EVENT_LOCATION, text),
            i18n.t('screens.generate.fieldsNames.eventLocation'),
          )}
          <View row>
            <View flex style={styles.textInputMargin}>
              <Picker
                type="datetime"
                placeholder={i18n.t('screens.generate.fieldsNames.eventStart')}
                onSetValue={text => props.updateField(fieldTypesList.EVENT_START, text)}
                title={i18n.t('screens.generate.fieldsNames.eventDateTitle')}
              />
            </View>
            <View flex>
              <Picker
                type="datetime"
                placeholder={i18n.t('screens.generate.fieldsNames.eventEnd')}
                minimumDate={props.fieldValues[fieldTypesList.EVENT_START]
                  && props.fieldValues[fieldTypesList.EVENT_START]}
                onSetValue={text => props.updateField(fieldTypesList.EVENT_END, text)}
                title={i18n.t('screens.generate.fieldsNames.eventDateTitle')}
              />
            </View>
          </View>
        </View>
      );
    default:
      return generateTextInput(
        20,
        text => props.updateField(fieldTypesList.TEXT, text),
        i18n.t('screens.generate.fieldsNames.text'),
      );
  }
};

const styles = StyleSheet.create({
  textInputMargin: {
    marginRight: 20,
  },
});

export default CodeGeneratingForm;
