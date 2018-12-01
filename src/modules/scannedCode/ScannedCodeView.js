import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import {
  View,
  Text,
  TextField,
  TextInput,
} from 'react-native-ui-lib';

import { commonStyles, colors } from '../../styles';
import { codeTypesList } from '../newCode/NewCodeState';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
};

export default function ScannedCodeView(props: Props) {
  const data = '+232323233232';
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View flex marginT-10 padding-20 bg-white>
        <View marginT-30>
          <TextInput
            text70
            floatingPlaceholder
            placeholder="Telephone number"
            value={data}
            editable={false}
            onChangeText={() => {}}
            disabledColor={colors.darkBlue}
            floatingPlaceholderColor={colors.darkGray}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
