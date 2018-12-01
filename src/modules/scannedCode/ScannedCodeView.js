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
import { parseScannedString } from './ScannedCodeState';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function ScannedCodeView(props: Props) {
  const data = `BEGIN:VEVENT
 UID:19970901T130000Z-123401@example.com
 DTSTAMP:19970901T130000Z
 DTSTART:19970903T163000Z
 DTEND:19970903T190000Z
 SUMMARY:Annual Employee Review
 CLASS:PRIVATE
 CATEGORIES:BUSINESS,HUMAN RESOURCES
 END:VEVENT`;
  const parsedString = parseScannedString(data);
  return (
    <SafeAreaView style={commonStyles.safeArea}>
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
