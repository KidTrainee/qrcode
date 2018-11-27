import React from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode';

import { BackButton, ButtonsGroup } from '../../components';

import { commonStyles, colors } from '../../styles';

type Props = {
  navigation: {
    navigate: (string) => void,
  },
};

const windowWidth = Dimensions.get('window').width;

export default function NewCodeView(props: Props) {
  return (
    <SafeAreaView style={[commonStyles.safeArea, styles.viewContainer]}>
      <TextInput
        style={styles.textInput}
        placeholder="Code value"
        placeholderTextColor={colors.darkGray}
        onChangeText={props.setCodeValue}
        // onChangeText={(text) => this.setState({text})}
        // value={this.state.text}
      />
      <ButtonsGroup
        buttons={["QR Code", "Bar Code"]}
        active={props.codeTypeValue}
        onChange={props.setCodeType}
        style={{ marginBottom: 40 }}
      />
      <QRCode
        value={props.codeInputValue}
        size={windowWidth - 80}
        bgColor='black'
        fgColor='white'
      />
    </SafeAreaView>
  )
}

NewCodeView.navigationOptions = ({navigation}) => ({
  headerTitle: <Text h1>New code</Text>,
  headerLeft: <BackButton onPress={() => navigation.goBack()} />,
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: colors.darkGray,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 30,
    marginHorizontal: 40,
  },
  textInput: {
    width: '100%',
    paddingBottom: 10,
    marginBottom: 20,
    fontFamily: 'Muli-light',
    fontSize: 18,
    backgroundColor: colors.white,
    borderBottomWidth: .5,
    borderColor: colors.darkGray,
    color: colors.darkGray
  }
});