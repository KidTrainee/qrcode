// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

import { colors } from '../../styles';

type Props = {
  activeCodeType: strign,
  updateField: (string) => void,
}

const CodeGeneratingForm = (props: Props) => {
  switch (props.activeCodeType) {
    case 'URL':
      return <TextInput onChangeText={(text) => props.updateField('text', text)} style={styles.textInput} placeholder="URL" />
    case 'Email':
      return <TextInput onChangeText={(text) => props.updateField('text', 'mailto:' + text)} style={styles.textInput} placeholder="Email" />
    case 'Tel':
      return <TextInput onChangeText={(text) => props.updateField('text', 'tel:' + text)} keyboardType='numeric' style={styles.textInput} placeholder="Tel" />
    case 'SMS':
      return <View>
        <TextInput onChangeText={(text) => props.updateField('sms_to', text)} style={styles.textInput} placeholder="Phone number" />
        <TextInput onChangeText={(text) => props.updateField('sms_message', text)} style={styles.textInput} placeholder="Message" />
      </View>
    case 'WiFi':
      return <View>
        <TextInput onChangeText={(text) => props.updateField('wifi_ssid', text)} style={styles.textInput} placeholder="SSID" />
        <TextInput onChangeText={(text) => props.updateField('wifi_encryption', text)} style={styles.textInput} placeholder="Encryption (WPA or WEP)" />
        <TextInput onChangeText={(text) => props.updateField('wifi_password', text)} style={styles.textInput} placeholder="Password" />
      </View>
    case 'Geo':
      return <View>
        <TextInput onChangeText={(text) => props.updateField('geo_long', text)} style={styles.textInput} placeholder="Long" />
        <TextInput onChangeText={(text) => props.updateField('geo_lat', text)} style={styles.textInput} placeholder="Lat" />
      </View>
    case 'Contact':
      return <View>
        <View row>
          <TextInput flex-0 onChangeText={(text) => props.updateField('contact_name', text)} style={[styles.textInput, styles.textInputMargin]} placeholder="First Name" />
          <TextInput flex-0 onChangeText={(text) => props.updateField('contact_surname', text)} style={styles.textInput} placeholder="Last Name" />
        </View>
        <TextInput onChangeText={(text) => props.updateField('contact_phone', text)} style={styles.textInput} placeholder="Phone" />
        <TextInput onChangeText={(text) => props.updateField('contact_email', text)} style={styles.textInput} placeholder="Email" />
        <TextInput onChangeText={(text) => props.updateField('contact_address', text)} style={styles.textInput} placeholder="Address" />
      </View>
    case 'Event':
      return <View>
        <TextInput onChangeText={(text) => props.updateField('event_title', text)} style={styles.textInput} placeholder="Title" />
        <TextInput onChangeText={(text) => props.updateField('event_description', text)} style={styles.textInput} placeholder="Description" />
        <TextInput onChangeText={(text) => props.updateField('event_location', text)} style={styles.textInput} placeholder="Location" />
        <View row>
          <TextInput onChangeText={(text) => props.updateField('event_start', text)} style={[styles.textInput, styles.textInputMargin]} placeholder="Start" />
          <TextInput onChangeText={(text) => props.updateField('event_end', text)} style={styles.textInput} placeholder="End" />
        </View>
      </View>
    default:
      return <TextInput onChangeText={(text) => props.updateField('text', text)} style={styles.textInput} placeholder="Text" />
  }
};

const styles = StyleSheet.create({
  textInput: {
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#000000",
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
  }
});

export default CodeGeneratingForm;