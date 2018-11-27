// @flow
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native-ui-lib';

type Props = {
  onPress: () => any,
}

const BackButton = (props: Props) => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={props.onPress}
  >
    <Image
      assetGroup="icons"
      assetName="back-arrow"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 15,
  },
});

export default BackButton;