import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { View } from 'react-native-ui-lib';

import { commonStyles, colors } from '../../styles';
import { RoundButton } from '../../components';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
};

const windowWidth = Dimensions.get('window').width;

export default function HomeView(props: Props) {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View
        style={styles.bottomBarContainer}
      >
      </View>

      <View
        style={styles.bottomBarButtonsContainer}
      >
        <View
          flex
          row
          padding-15
          style={{
            justifyContent: 'space-around',
          }}
        >
          <RoundButton iconName="flashlight" />
          <RoundButton iconName="plus" bigger style={{ marginTop: -30}} />
          <RoundButton iconName="history" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bottomBarContainer: {
    position: 'absolute',
    bottom: -windowWidth/2,
    left: 0,
    right: 0,
    height: windowWidth,
    width: windowWidth,
    backgroundColor: colors.white,
    shadowColor: '#696767',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: windowWidth,
    transform: [
      { scaleX: 2 }
    ],
  },
  bottomBarButtonsContainer: {
    position: 'absolute',
    bottom: -windowWidth/2,
    left: 0,
    right: 0,
    height: windowWidth - 50,
    width: windowWidth,
    backgroundColor: colors.white,
  },
});
