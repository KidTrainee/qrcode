// @flow
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';

import { colors } from '../styles';

type Props = {
  onPress: () => any,
  children: string,
  variant: string,
  style: any,
  radius: number,
  textColor: string,
  borderColor: string,
}

const Button = (props: Props) => {
  const variant = colors[props.variant] ? colors[props.variant] : colors.primary;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: variant },
        props.radius && { borderRadius: props.radius },
        { borderColor: props.borderColor ? colors[props.borderColor] : variant },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <Text
        h2
        style={[
          styles.buttonText,
          props.textColor && { color: colors[props.textColor] },
        ]}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderWidth: 3,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default Button;
