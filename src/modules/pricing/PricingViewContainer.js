// @flow
import { Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  compose, withState, withHandlers, lifecycle,
} from 'recompose';
import * as RNIap from 'react-native-iap';

import i18n from '../../translations';
import { setIsPro } from '../AppState';
import PricingView from './PricingView';

const itemSkus = Platform.select({
  ios: 'io.insider.apps.qr.pro',
  android: 'io.insider.apps.qr.pro', // 'android.test.purchased',
});

export const enhance = compose(
  connect(
    state => ({
      isPro: state.app.isPro,
    }),
    dispatch => ({
      setIsPro: value => dispatch(setIsPro(value)),
    }),
  ),
  withState('isLoading', 'setLoadingStatus', false),
  withState('products', 'setProducts', []),
  withHandlers({
    showErrorAlert: () => () => {
      Alert.alert(
        i18n.t('screens.pricing.wrongAlert.title'),
        i18n.t('screens.pricing.wrongAlert.message'),
        [
          { text: i18n.t('screens.pricing.wrongAlert.okButton') },
        ],
      );
    },
  }),
  withHandlers({
    goBackWithAlert: props => () => {
      props.navigation.pop();
      props.showErrorAlert();
    },
  }),
  withHandlers({
    restorePurchases: props => async () => {
      if (props.isLoading) {
        return;
      }
      props.setLoadingStatus(true);
      try {
        const purchases = await RNIap.getAvailablePurchases();
        purchases.forEach((purchase) => {
          if (purchase.productId === itemSkus) {
            props.setIsPro(true);
            props.navigation.pop();
            Alert.alert(
              i18n.t('screens.pricing.restoreAlert.title'),
              i18n.t('screens.pricing.restoreAlert.message'),
            );
          }
        });
      } catch (e) {
        props.showErrorAlert();
      }
      props.setLoadingStatus(false);
    },
  }),
  withHandlers({
    buyProVersion: props => async () => {
      if (props.isLoading) {
        return;
      }
      props.setLoadingStatus(true);
      try {
        await RNIap.buyProduct(itemSkus);
        props.setLoadingStatus(false);
        firebase.analytics().logEvent('goPro');
        props.setIsPro(true);
        props.navigation.pop();
      } catch (e) {
        if (e.code === 'E_ALREADY_OWNED') {
          props.setLoadingStatus(false);
          props.restorePurchases();
        } else {
          props.showErrorAlert();
        }
      }
      props.setLoadingStatus(false);
    },
  }),
  lifecycle({
    async componentDidMount() {
      firebase.analytics().setCurrentScreen('pricing', 'PricingView');
      this.props.setLoadingStatus(true);
      // check if products are valid
      // try {
      //   const products = await RNIap.getProducts([itemSkus]);
      //   this.props.setProducts(products);
      //   if (products.length === 0) {
      //     this.props.goBackWithAlert();
      //   }
      // } catch (e) {
      //   this.props.goBackWithAlert();
      // }
      this.props.setLoadingStatus(false);
      this.props.goBackWithAlert();
    },
  }),
);

export default enhance(PricingView);
