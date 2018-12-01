import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  View,
  Text,
  TextField,
  TextInput,
} from 'react-native-ui-lib';

import { commonStyles, colors } from '../../styles';
import { parseScannedString } from './ScannedCodeState';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function ScannedCodeView(props: Props) {
  const data = props.navigation.state.params.data || '';
  const parsedString = parseScannedString(data);
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar translucent={false} backgroundColor={colors.primary} />
      <View flex marginT-10 paddingH-20 bg-white>
        <View>
          <Text h1 center marginB-20>{parsedString.type}</Text>
          { parsedString.fields.map(field => (
            <TextInput
              key={field.title.replace(' ', '')}
              text70
              floatingPlaceholder
              placeholder={capitalizeFirstLetter(field.title)}
              value={field.value || '--'}
              editable={false}
              disabledColor={colors.darkBlue}
              floatingPlaceholderColor={colors.darkGray}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
