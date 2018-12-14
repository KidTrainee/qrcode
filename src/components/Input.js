// @flow
import React from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  TextInput as UITextInput,
} from 'react-native-ui-lib';

import { colors } from '../styles';

type Props = {
  style?: any,
  multiline: boolean,
  placeholder?: string,
};

const TextInput = Platform.select({
  android: UITextInput,
  ios: RNTextInput,
});

const Input = (props: Props) => (
  <TextInput
    style={[
      styles.textInput,
      props.style && props.style,
      props.multiline && Platform.OS === 'ios' && { paddingTop: 20 },
    ]}
    {...props}
    {...Platform.select({
      ios: {},
      android: {
        // mode: 'outlined',
        label: props.placeholder || '',
        underlineColor: colors.lightGray,
        floatingPlaceholder: true,
        floatingPlaceholderColor: {
          default: colors.lightGray,
          focus: colors.darkBlue,
        },
        color: colors.darkBlue,
      },
    })}
  />
);

const styles = StyleSheet.create({
  textInput: Platform.select({
    ios: {
      flexGrow: 1,
      backgroundColor: colors.white,
      borderRadius: 5,
      shadowColor: colors.darkBlue,
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
    android: {

    },
  }),
});

export default Input;
