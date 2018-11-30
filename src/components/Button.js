// @flow
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image, Text } from 'react-native-ui-lib';

import { colors } from '../styles';

type Props = {
  onPress: () => any,
  children: string,
  variant: string,
  style: any,
  radius: number,
}

const Button = (props: Props) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: colors[props.variant] ? colors[props.variant] : colors.primary },
      props.radius && { borderRadius: props.radius },
      props.style,
    ]}
    onPress={props.onPress}
  >
    <Text h2 style={[styles.buttonText, ]}>{props.children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  }
});

export default Button;