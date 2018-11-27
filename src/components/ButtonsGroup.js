// @flow
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';

import { colors } from '../styles';

type Props = {
  onChange: () => any,
  buttons: [string],
  style: any,
};

const ButtonsGroup = (props: Props) => (
  <View style={[styles.buttonsGroupContainer, props.style]}> 
    {props.buttons && props.buttons.map(button => <TouchableOpacity
      key={button}
      style={[styles.groupButton, props.active === button && styles.activeGroupButton]}
      onPress={() => props.onChange(button)}
    >
      <Text h2 style={props.active === button ? styles.activeButtonText : styles.buttonText}>{button}</Text>
    </TouchableOpacity>)}
  </View>
);

const styles = StyleSheet.create({
  buttonsGroupContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    flexDirection: 'row',
  },
  groupButton: {
    paddingVertical: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
  activeGroupButton: {
    backgroundColor: colors.primary
  },
  buttonText: {
    color: colors.primary,
  },
  activeButtonText: {
    color: colors.white,
  }
});

export default ButtonsGroup;