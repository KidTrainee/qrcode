// @flow
import React from 'react';
import {
  SafeAreaView, TouchableOpacity, StyleSheet, Linking, ActivityIndicator,
} from 'react-native';
import { Image, View, Text } from 'react-native-ui-lib';

import { Button } from '../../components';
import commonStyles from '../../styles/common';

type Props = {
  isLoading: boolean,
  buyProVersion: () => void,
  restorePurchases: () => void,
};

export default function PricingView(props: Props) {
  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View flex-1 spread>
        <View flex>
          <View centerH marginT-25>
            <Image
              assetGroup="images"
              assetName="pricing"
              resizeMode="contain"
              style={{ width: 250, height: 220 }}
            />
          </View>
          <Text h2 center marginB-25>Pro Version</Text>
          <View row paddingH-50 marginB-15>
            <Image
              assetGroup="icons"
              assetName="check"
              resizeMode="contain"
              style={{ width: 16, height: 16 }}
            />
            <Text marginL-15>Unlimited history</Text>
          </View>
          <View row paddingH-50 marginB-15>
            <Image
              assetGroup="icons"
              assetName="check"
              resizeMode="contain"
              style={{ width: 16, height: 16 }}
            />
            <Text marginL-15>Codes customization</Text>
          </View>
          <View row paddingH-50 marginB-15>
            <Image
              assetGroup="icons"
              assetName="check"
              resizeMode="contain"
              style={{ width: 16, height: 16 }}
            />
            <Text marginL-15>Batch scan</Text>
          </View>
          <View row paddingH-50>
            <Image
              assetGroup="icons"
              assetName="check"
              resizeMode="contain"
              style={{ width: 16, height: 16 }}
            />
            <Text marginL-15>Advanced codes generation</Text>
          </View>
          <View paddingH-50 center style={{ flexGrow: 1 }}>
            <Button style={{ minWidth: '100%' }} onPress={props.buyProVersion}>
              {props.isLoading
                ? <ActivityIndicator color="#FFFFFF" />
                : 'Purchase for $4.99'
              }
            </Button>
            <View row marginT-10>
              <Text style={styles.restoreText} gray>Also you can</Text>
              <TouchableOpacity onPress={props.restorePurchases}>
                <Text style={styles.restoreText} primary>&nbsp;restore&nbsp;</Text>
              </TouchableOpacity>
              <Text style={styles.restoreText} gray>your payment</Text>
            </View>
          </View>
        </View>
        <View centerH marginB-10 paddingH-50>
          <View row>
            <Text gray text100>Check out the</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://apps.insider.io/policy/qrcode-ios')}>
              <Text style={{ fontSize: 10 }} primary>&nbsp;Privacy policy&nbsp;</Text>
            </TouchableOpacity>
          </View>
          <Text center gray text100>Payment will be chargered to iTunes Account at confirmation of purchase</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  restoreText: {
    fontSize: 14,
  },
});
