import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  Image,
} from 'react-native-ui-lib';

import GeneratingForm from './CodeGeneratingFormComponent';
import { codeTypesList } from './NewCodeState';
import { Button } from '../../components';

import { commonStyles, colors } from '../../styles';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
  activeCodeType: string,
  updateField: (string) => void,
  changeCodeType: (string) => void,
  isPro: boolean,
};

export const codeTypes = [
  { id: 0, label: codeTypesList.TEXT, icon: 'text' },
  { id: 1, label: codeTypesList.URL, icon: 'text' },
  { id: 2, label: codeTypesList.EMAIL, icon: 'text' },
  { id: 3, label: codeTypesList.TEL, icon: 'text' },
  { id: 5, label: codeTypesList.SMS, icon: 'text' },
  {
    id: 4, label: codeTypesList.CONTACT, icon: 'text', proOnly: true,
  },
  {
    id: 6, label: codeTypesList.GEO, icon: 'text', proOnly: true,
  },
  {
    id: 7, label: codeTypesList.EVENT, icon: 'text', proOnly: true,
  },
  {
    id: 8, label: codeTypesList.WIFI, icon: 'text', proOnly: true,
  },
];

export default function NewCodeView(props: Props) {
  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.lightBlue}
      />
      <View centerH marginB-25 marginT-10>
        <Text h1 darkBlue testID="label:generate-code">Generate Code</Text>
      </View>
      <ScrollView
        testID="scroll:code-type"
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.typesContainer}
      >
        {codeTypes.map((codeType, index) => (
          <TouchableOpacity
            testID={`button:codeType-${codeType.label}`}
            key={codeType.id}
            onPress={!props.isPro && codeType.proOnly
              ? () => props.navigation.navigate('Pricing')
              : () => props.changeCodeType(codeType.label)
            }
            style={[
              styles.typeContainer,
              index === codeTypes.length - 1 && { marginRight: 40 },
              codeType.label === props.activeCodeType && styles.activeCodeType,
            ]}
          >
            <Image
              assetGroup="types"
              assetName={codeType.label !== props.activeCodeType ? codeType.icon : `${codeType.icon}-white`}
            />
            <Text h3 lightBlue marginT-5 white={codeType.label === props.activeCodeType}>{codeType.label}</Text>
            {codeType.proOnly && !props.isPro && (
              <View style={styles.proLabel} paddingH-3 paddingV-1 br20 marginB-4 marginL-5>
                <Text white>Pro</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <KeyboardAwareScrollView
        viewIsInsideTabBar
        extraScrollHeight={-50}
        style={{ paddingHorizontal: 5, flex: 1, marginBottom: -20 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback style={{ flex: 1 }} testID="touchable:hideKeyboard" onPress={Keyboard.dismiss}>
          <View flex-1 style={styles.formWrapper}>
            <View>
              <GeneratingForm
                activeCodeType={props.activeCodeType}
                updateField={props.updateField}
                fieldValues={props.fieldValues}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <Button
        testID="button:generate"
        onPress={() => props.navigation.navigate(
          'GeneratedCode',
          { codeType: props.activeCodeType, fieldValues: props.fieldValues },
        )}
        radius={5}
        variant="darkGray"
        style={{
          marginBottom: 10,
        }}
      >
        Generate
      </Button>
    </SafeAreaView>
  );
}

const codeTypeWidth = 80;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 15,
    justifyContent: 'flex-start',
  },
  typesContainer: {
    maxHeight: codeTypeWidth + 10, // 5px * 2 vertival padding
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  typeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: codeTypeWidth,
    height: codeTypeWidth,
    marginRight: 20,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  proLabel: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: colors.red,
  },
  activeCodeType: {
    backgroundColor: colors.primaryGradientStart,
    color: colors.white,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  formWrapper: {
    marginHorizontal: -25,
    paddingHorizontal: 25,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
});
