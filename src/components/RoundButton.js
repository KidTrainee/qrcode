// @flow
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native-ui-lib';

import { colors } from '../styles';

type Props = {
  onPress: () => any,
  bigger: boolean,
  style: any,
  iconName: 'plus' | 'flashlight' | 'history',
};

const RoundButton = (props: Props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      styles.container,
      props.bigger && styles.containerBigger,
      props.style,
    ]}
  >
    <Image
      assetGroup="icons"
      assetName={props.iconName || 'plus'}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 60,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  containerBigger: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
});

export default RoundButton;
