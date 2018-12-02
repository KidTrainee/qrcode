// @flow
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../styles';

type Props = {
  onPress: () => any,
  children: string,
  variant?: string,
  style?: any,
  radius?: number,
  textColor?: string,
  borderColor?: string,
}

const Button = (props: Props) => {
  const variant = colors[props.variant] ? colors[props.variant] : colors.primary;
  return (
    <TouchableOpacity
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
        colors={['#FFB36F', '#FF7B3C']}
        style={[
          styles.button,
          { backgroundColor: variant },
          props.radius && { borderRadius: props.radius },
          props.style,
        ]}
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
