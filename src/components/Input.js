// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { colors } from '../styles';

type Props = {
  style: any
};

const Input = (props: Props) => (
  <TextInput
    style={[styles.textInput, props.style]}
    {...props}
  />
);

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
});

export default Input;
