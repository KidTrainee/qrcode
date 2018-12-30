// @flow
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { Image, View, Text } from 'react-native-ui-lib';
import _ from 'lodash';

import i18n from '../../translations';
import { Button } from '../../components';

type Props = {
  isLoading: boolean,
  buyProVersion: () => void,
  restorePurchases: () => void,
  products: Array<{ price: number }>
};

export default function PricingView(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          ...Platform.select({
            ios: { flex: 1 },
            android: {},
          }),
        }}
      >
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
            <Text h2 center marginB-25>{i18n.t('screens.pricing.proLabel')}</Text>
            <View row paddingH-50 marginB-15>
              <Image
                assetGroup="icons"
                assetName="check"
                resizeMode="contain"
                style={{ width: 16, height: 16 }}
              />
              <Text marginL-15 default>{i18n.t('screens.pricing.advantages.0')}</Text>
            </View>
            <View row paddingH-50 marginB-15>
              <Image
                assetGroup="icons"
                assetName="check"
                resizeMode="contain"
                style={{ width: 16, height: 16 }}
              />
              <Text marginL-15 default>{i18n.t('screens.pricing.advantages.1')}</Text>
            </View>
            <View row paddingH-50 marginB-15>
              <Image
                assetGroup="icons"
                assetName="check"
                resizeMode="contain"
                style={{ width: 16, height: 16 }}
              />
              <Text marginL-15 default>{i18n.t('screens.pricing.advantages.2')}</Text>
            </View>
            <View row paddingH-50>
              <Image
                assetGroup="icons"
                assetName="check"
                resizeMode="contain"
                style={{ width: 16, height: 16 }}
              />
              <Text marginL-15 deafault>{i18n.t('screens.pricing.advantages.3')}</Text>
            </View>
            <View marginV-20 paddingV-20 paddingH-50 center style={{ flexGrow: 1 }}>
              <Button style={{ minWidth: '100%' }} onPress={props.buyProVersion}>
                {props.isLoading
                  ? <ActivityIndicator color="#FFFFFF" />
                  : `${i18n.t('screens.pricing.purchase')} ${_.get(props.products, '0.localizedPrice', '4.99')}`
              }
              </Button>
              <View row marginT-10>
                <Text style={styles.restoreText} gray default>{i18n.t('screens.pricing.restore.0')}</Text>
                <TouchableOpacity onPress={props.restorePurchases}>
                  <Text style={styles.restoreText} primary default>
                    &nbsp;{i18n.t('screens.pricing.restore.1')}&nbsp;
                  </Text>
                </TouchableOpacity>
                <Text style={styles.restoreText} gray default>{i18n.t('screens.pricing.restore.2')}</Text>
              </View>
            </View>
          </View>
          <View centerH marginB-10 paddingH-50>
            <View row>
              <Text defaultLight gray text100>{i18n.t('screens.pricing.privacy.0')}</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://apps.insider.io/policy/qrcode-ios')}>
                <Text defaultLight center primary text100>&nbsp;{i18n.t('screens.pricing.privacy.1')}&nbsp;</Text>
              </TouchableOpacity>
            </View>
            <Text defaultLight center gray text100>
              {
                `${i18n.t('screens.pricing.privacy.2')
                } ${Platform.select({ ios: 'iTunes', android: 'Google' })
                } ${i18n.t('screens.pricing.privacy.3')}`
              }
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  restoreText: {
    fontSize: 14,
  },
  policyText: {
    fontSize: 10,
    lineHeight: 11,
  },
});
