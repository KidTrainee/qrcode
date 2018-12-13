// @flow
import { Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  compose, withState, withHandlers, lifecycle,
} from 'recompose';
import * as RNIap from 'react-native-iap';

import { setIsPro } from '../AppState';
import PricingView from './PricingView';

const itemSkus = Platform.select({
  ios: [
    'io.insider.apps.qr.pro',
  ],
  android: [
    'io.insider.apps.qr.pro',
  ],
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
        'Something was wrong',
        'Please, try again',
        [
          { text: 'OK' },
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
    buyProVersion: props => async () => {
      if (props.isLoading) {
        return;
      }
      props.setLoadingStatus(true);
      try {
        await RNIap.buyProduct('io.insider.apps.qr.pro');
        props.setLoadingStatus(false);
        firebase.analytics().logEvent('goPro');
        props.setIsPro(true);
        props.navigation.pop();
      } catch (e) {
        props.showErrorAlert();
      }
      props.setLoadingStatus(false);
    },
    restorePurchases: props => async () => {
      if (props.isLoading) {
        return;
      }
      props.setLoadingStatus(true);
      try {
        const purchases = await RNIap.getAvailablePurchases();
        purchases.forEach((purchase) => {
          if (purchase.productId === 'io.insider.apps.qr.pro') {
            props.setIsPro(true);
            props.navigation.pop();
          }
        });
        Alert.alert(
          'Restore Successful',
          'You successfully restored the following purchases: QRCode Pro',
        );
      } catch (e) {
        props.showErrorAlert();
      }
      props.setLoadingStatus(false);
    },
  }),
  lifecycle({
    async componentDidMount() {
      firebase.analytics().setCurrentScreen('pricing', 'PricingView');
      this.props.setLoadingStatus(true);
      // check if products are valid
      try {
        const products = await RNIap.getProducts(itemSkus);
        this.props.setProducts(products);
        if (products.length === 0) {
          this.props.goBackWithAlert();
        }
      } catch (e) {
        this.props.goBackWithAlert();
      }
      this.props.setLoadingStatus(false);
    },
  }),
);

export default enhance(PricingView);
