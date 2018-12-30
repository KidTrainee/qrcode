import {
  Alert,
  Clipboard,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {
  compose, withState, withHandlers, lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import RNCalendarEvents from 'react-native-calendar-events';
import Contacts from 'react-native-contacts';
import moment from 'moment';

import firebase from 'react-native-firebase';
import ScannedCodeView from './ScannedCodeView';
import i18n from '../../translations';

export default compose(
  connect(
    state => ({
      isPro: state.app.isPro,
    }),
  ),
  withState('toastRef', 'setToastRef', null),
  withHandlers({
    addToContactsAction: () => (contact) => {
      Contacts.addContact(contact, (addErr) => {
        if (addErr) {
          return Alert.alert(
            i18n.t('screens.pricing.wrongAlert.title'),
            i18n.t('screens.pricing.wrongAlert.message'),
            [{ text: i18n.t('screens.pricing.wrongAlert.okButton') }],
          );
        }
        return Alert.alert(
          i18n.t('screens.scanned.contactAlert.title'),
          i18n.t('screens.scanned.contactAlert.message'),
          [{ text: i18n.t('screens.scanned.successButton') }],
        );
      });
    },
  }),
  withHandlers({
    goPricingPage: props => () => {
      props.navigation.navigate('Pricing');
    },
    goGeneratedCodePage: props => () => {
      props.navigation.navigate('GeneratedCode', { raw: true, data: props.navigation.state.params.data });
    },
    addToCalendar: () => async (fieldsDict) => {
      const details = {
        description: fieldsDict.description,
        location: fieldsDict.location,
        startDate: moment(fieldsDict.start).toISOString(),
        endDate: moment(fieldsDict.end).toISOString(),
      };

      try {
        const status = await RNCalendarEvents.authorizeEventStore();
        if (status === 'authorized' && Platform.OS === 'android') {
          const calendars = await RNCalendarEvents.findCalendars();
          details.calendarId = calendars.find(calendar => calendar.isPrimary).id;
        }
        const id = await RNCalendarEvents.saveEvent(fieldsDict.title, details);

        if (id) {
          Alert.alert(
            i18n.t('screens.scanned.eventAlert.title'),
            i18n.t('screens.scanned.eventAlert.message'),
            [{ text: i18n.t('screens.scanned.successButton') }],
          );
        } else {
          Alert.alert(
            i18n.t('screens.pricing.wrongAlert.title'),
            i18n.t('screens.pricing.wrongAlert.message'),
            [{ text: i18n.t('screens.pricing.wrongAlert.okButton') }],
          );
        }
      } catch (e) {
        Alert.alert(
          i18n.t('screens.pricing.wrongAlert.title'),
          i18n.t('screens.pricing.wrongAlert.message'),
          [{ text: i18n.t('screens.pricing.wrongAlert.okButton') }],
        );
      }
    },
    addToContacts: props => async (fieldsDict) => {
      const contact = {
        familyName: fieldsDict.surname,
        givenName: fieldsDict.name,
        ...fieldsDict.email ? {
          emailAddresses: [{
            label: 'Home',
            email: fieldsDict.email,
          }],
        } : {},
        ...fieldsDict.phone ? {
          phoneNumbers: [{
            label: 'Home',
            number: fieldsDict.phone,
          }],
        } : {},
      };
      // iOS
      if (Platform.OS === 'ios') {
        Contacts.checkPermission((err, permission) => {
          if (err) throw err;

          if (permission === 'undefined') {
            Contacts.requestPermission((requestErr, newPermission) => {
              if (newPermission === 'authorized') {
                props.addToContactsAction(contact);
              } else {
                Alert.alert(
                  i18n.t('screens.pricing.wrongAlert.title'),
                  i18n.t('screens.pricing.wrongAlert.message'),
                  [{ text: i18n.t('screens.pricing.wrongAlert.okButton') }],
                );
              }
            });
          } else {
            props.addToContactsAction(contact);
          }
        });
      } else {
        // Android
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
            {
              title: i18n.t('screens.scanned.contactPermissionsAlert.title'),
              message: i18n.t('screens.scanned.contactPermissionsAlert.message'),
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            props.addToContactsAction(contact);
          } else {
            Alert.alert(
              i18n.t('screens.pricing.wrongAlert.title'),
              i18n.t('screens.pricing.wrongAlert.message'),
              [{ text: i18n.t('screens.pricing.wrongAlert.okButton') }],
            );
          }
        } catch (err) {
          Alert.alert(
            i18n.t('screens.pricing.wrongAlert.title'),
            i18n.t('screens.pricing.wrongAlert.message'),
            [{ text: i18n.t('screens.pricing.wrongAlert.okButton') }],
          );
        }
      }
    },
    copyToClipboard: props => (data: string) => {
      Clipboard.setString(data);
      if (Platform.OS === 'ios') {
        if (props.toastRef) props.toastRef.show(i18n.t('screens.scanned.copied'));
      } else {
        ToastAndroid.show(i18n.t('screens.scanned.copied'), ToastAndroid.SHORT);
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      firebase.analytics().setCurrentScreen('scanned-code', 'ScannedCodeView');
    },
  }),
)(ScannedCodeView);
