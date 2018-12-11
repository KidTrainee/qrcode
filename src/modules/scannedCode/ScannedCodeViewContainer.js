import { Alert, Clipboard } from 'react-native';
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
    goPricingPage: props => () => {
      props.navigation.navigate('Pricing');
    },
    goGeneratedCodePage: props => () => {
      props.navigation.navigate('GeneratedCode', { raw: true, data: props.navigation.state.params.data });
    },
    addToCalendar: () => (fieldsDict) => {
      const details = {
        description: fieldsDict.description,
        location: fieldsDict.location,
        startDate: moment(fieldsDict.start).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        endDate: moment(fieldsDict.end).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
      };

      RNCalendarEvents.authorizeEventStore()
        .then(status => status === 'authorized' && RNCalendarEvents.saveEvent(fieldsDict.title, details))
        .then((id) => {
          if (id) {
            Alert.alert(
              'Event was saved',
              'You can find it in calendar',
              [{ text: 'Great!' }],
              { cancelable: false },
            );
          }
        })
        .catch(() => {
          Alert.alert(
            'Something was wrong',
            [{ text: 'Close' }],
            { cancelable: false },
          );
        });
    },
    addToContacts: () => (fieldsDict) => {
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
      Contacts.checkPermission((err, permission) => {
        if (err) throw err;

        if (permission === 'undefined') {
          Contacts.requestPermission((requestErr, newPermission) => {
            if (newPermission === 'authorized') {
              Alert.alert(
                'Contact was saved',
                'You can find it in contacts',
                [{ text: 'Great!' }],
                { cancelable: false },
              );
            } else {
              Alert.alert(
                'Something was wrong',
                [{ text: 'Close' }],
                { cancelable: false },
              );
            }
          });
        } else {
          Contacts.addContact(contact, (addErr) => {
            if (addErr) {
              return Alert.alert(
                'Something was wrong',
                [{ text: 'Close' }],
                { cancelable: false },
              );
            }
            return Alert.alert(
              'Contact was saved',
              'You can find it in contacts',
              [{ text: 'Great!' }],
              { cancelable: false },
            );
          });
        }
      });
    },
    copyToClipboard: props => (data: string) => {
      Clipboard.setString(data);
      if (props.toastRef) props.toastRef.show('Copied to clipboard!');
    },
  }),
  lifecycle({
    componentDidMount() {
      firebase.analytics().setCurrentScreen('scanned-code', 'ScannedCodeView');
    },
  }),
)(ScannedCodeView);
