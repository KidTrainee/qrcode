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
            'Something was wrong',
            'Please, try again',
            [{ text: 'Close' }],
          );
        }
        return Alert.alert(
          'Contact was saved',
          'You can find it in contacts',
          [{ text: 'Great!' }],
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
            'Event was saved',
            'You can find it in calendar',
            [{ text: 'Great!' }],
          );
        } else {
          Alert.alert(
            'Something was wrong',
            'Please, try again',
            [{ text: 'Close' }],
          );
        }
      } catch (e) {
        Alert.alert(
          'Something was wrong',
          'Please, try again',
          [{ text: 'Close' }],
        );
      }
    },
    addToContacts: props => async (fieldsDict) => {
      const contact = {
        emailAddresses: [{
          label: 'Home',
          email: fieldsDict.email,
        }],
        phoneNumbers: [{
          label: 'Home',
          number: fieldsDict.phone,
        }],
        familyName: fieldsDict.surname,
        givenName: fieldsDict.name,
      };
      // iOS
      if (Platform.OS === 'ios') {
        Contacts.checkPermission((err, permission) => {
          if (err) throw err;

          if (permission === 'undefined') {
            Contacts.requestPermission((requestErr, newPermission) => {
              if (newPermission === 'authorized') {
                Alert.alert(
                  'Contact was saved',
                  'You can find it in contacts',
                  [{ text: 'Great!' }],
                );
              } else {
                Alert.alert(
                  'Something was wrong',
                  'Please, try again',
                  [{ text: 'Close' }],
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
              title: 'Add to Contacts Permission',
              message: 'QR Code needs access to your contacts to create new contact',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            props.addToContactsAction(contact);
          } else {
            Alert.alert(
              'Premissions denied',
              'You can find it in your contacts',
              [{ text: 'Close' }],
            );
          }
        } catch (err) {
          Alert.alert(
            'Something was wrong',
            'Please, try again',
            [{ text: 'Close' }],
          );
        }
      }
    },
    copyToClipboard: props => (data: string) => {
      Clipboard.setString(data);
      if (Platform.OS === 'ios') {
        if (props.toastRef) props.toastRef.show('Copied to clipboard!');
      } else {
        ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      firebase.analytics().setCurrentScreen('scanned-code', 'ScannedCodeView');
    },
  }),
)(ScannedCodeView);
