// @flow
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../styles';
import type { ColorType } from '../styles/colors';

type ButtonProps = {
  onPress: () => any,
  children: string,
  variant?: ColorType,
  style?: any,
  radius?: number,
  textColor?: string,
  testID?: string,
}

const Button = (props: ButtonProps) => {
  const variant = colors[props.variant];
  const gradient = !variant ? [colors.primaryGradientStart, colors.primaryGradientEnd] : [variant, variant];
  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={props.onPress}
      style={styles.buttonContainer}
    >
      <LinearGradient
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        colors={gradient}
        style={[
          styles.button,
          props.radius && { borderRadius: props.radius },
          props.style,
        ]}
      >
        {typeof props.children === 'string'
          ? (
            <Text
              h2
              style={[
                styles.buttonText,
                props.textColor && { color: colors[props.textColor] },
              ]}
            >
              {props.children}
            </Text>)
          : props.children
        }
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  button: {
    padding: 20,
    borderRadius: 50,
    elevation: 1,
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default Button;
