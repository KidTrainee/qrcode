// @flow
import vcard from 'vcard-parser';
import _ from 'lodash';

import i18n from '../../translations';
import { codeTypesList } from '../newCode/NewCodeState';

type ScannedCodeState = {};

type Action = {
  type: string, payload: any,
};

const initialState: ScannedCodeState = {};

/**
 * Converts [1, 'one', 2, 'two'] to {1: 'one', 2: 'two'}
 * @param array elements array
 * @param startIndex starts from the given index
 */
export function convertArrayToKeyValue(array: Array<any>, startIndex: number = 0): any {
  const keyValue = {};
  for (let i = startIndex, j = startIndex + 1; array[i] || array[j]; i += 2, j += 2) {
    if (array[i] && array[j]) keyValue[array[i]] = array[j];
  }
  return keyValue;
}

export function parseScannedString(scannedString: string = ''): {
  type: string,
  fields: Array<{
    title: string,
    value: string,
  }>
} {
  const result: {
    type: string,
    fields: Array<{
      title: string,
      value: string,
    }>
  } = {
    type: codeTypesList.TEXT,
    fields: [],
  };

  if (!scannedString) {
    // eslint-disable-next-line no-param-reassign
    scannedString = '';
  }
  // eslint-disable-next-line no-param-reassign
  scannedString = `${scannedString}`;
  const splittedInputString = scannedString.split(':');
  switch (scannedString.split(':')[0].toUpperCase()) {
    case 'SMSTO':
    case 'SMS':
      result.type = codeTypesList.SMS;
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.smsTo'), value: splittedInputString[1] || '' },
        { title: i18n.t('screens.generate.fieldsNames.emailBody'), value: splittedInputString[2] || '' },
      ];
      break;
    case 'WIFI':
      result.type = codeTypesList.WIFI;
      const parsedWifiFields = {
        s: '',
        t: '',
        p: '',
      };
      const cleanedWifiString = scannedString
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .replace('WIFI:', '')
        .replace(';;', '');
      const scannedWifiValues = cleanedWifiString.split(';');
      scannedWifiValues.forEach((value) => {
        const keyValue = value.split(':');
        parsedWifiFields[keyValue[0].toLocaleLowerCase()] = keyValue[1] || '';
      });
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.wifiSsid'), value: parsedWifiFields.s },
        { title: i18n.t('screens.generate.fieldsNames.wifiEncryption'), value: parsedWifiFields.t },
        { title: i18n.t('screens.generate.fieldsNames.wifiPassword'), value: parsedWifiFields.p },
      ];
      break;
    case 'GEO':
      result.type = codeTypesList.GEO;
      const geoString = splittedInputString[1] || '';
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.geoLong'), value: geoString.split(',')[0] || '' },
        { title: i18n.t('screens.generate.fieldsNames.geoLat'), value: geoString.split(',')[1] || '' },
      ];
      break;
    case 'MATMSG':
      result.type = codeTypesList.EMAIL;
      const parsedFields = {
        to: '',
        sub: '',
        body: '',
      };
      const cleanedString = scannedString
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .replace('MATMSG:', '')
        .replace(';;', '');
      const scannedValues = cleanedString.split(';');
      scannedValues.forEach((value) => {
        const keyValue = value.split(':');
        parsedFields[keyValue[0].toLocaleLowerCase()] = keyValue[1] || '';
      });
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.emailTo'), value: parsedFields.to },
        { title: i18n.t('screens.generate.fieldsNames.emailSubject'), value: parsedFields.sub },
        { title: i18n.t('screens.generate.fieldsNames.emailBody'), value: parsedFields.body },
      ];
      break;
    case 'MAILTO':
      result.type = codeTypesList.EMAIL;
      const emailString = splittedInputString[1] || '';
      const emailParams = emailString.split('?')[1] || '';
      const emailParamsArray = emailParams.split('&');
      let emailSubject;
      let emailBody;
      if (emailParamsArray[0].split('=')[0].toLocaleLowerCase() === 'subject') {
        // eslint-disable-next-line
        emailSubject = emailParamsArray[0].split('=')[1];
      }
      if (emailParamsArray[0].split('=')[0].toLocaleLowerCase() === 'body') {
        // eslint-disable-next-line
        emailBody = emailParamsArray[0].split('=')[1];
      }
      if (emailParamsArray[1] && emailParamsArray[1].split('=')[0].toLocaleLowerCase() === 'subject') {
        // eslint-disable-next-line
        emailSubject = emailParamsArray[1].split('=')[1];
      }
      if (emailParamsArray[1] && emailParamsArray[1].split('=')[0].toLocaleLowerCase() === 'body') {
        // eslint-disable-next-line
        emailBody = emailParamsArray[1].split('=')[1];
      }
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.emailTo'), value: emailString.split('?')[0] || '' },
        { title: i18n.t('screens.generate.fieldsNames.emailSubject'), value: emailSubject || '' },
        { title: i18n.t('screens.generate.fieldsNames.emailBody'), value: emailBody || '' },
      ];
      break;
    case 'TEL':
      result.type = codeTypesList.TEL;
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.smsTo'), value: splittedInputString[1] || '' },
      ];
      break;
    case 'BEGIN': {
      if (scannedString.indexOf('BEGIN:VCARD') > -1) {
        result.type = codeTypesList.CONTACT;
        const parsedCard = vcard.parse(scannedString);
        result.fields = [
          { title: i18n.t('screens.generate.fieldsNames.contactName'), value: _.get(parsedCard, 'n[0].value[1]', '') },
          {
            title: i18n.t('screens.generate.fieldsNames.contactSurname'),
            value: _.get(parsedCard, 'n[0].value[0]', ''),
          },
          {
            title: i18n.t('screens.generate.fieldsNames.contactFullName'),
            value: _.get(parsedCard, 'fn[0].value', ''),
          },
          {
            title: i18n.t('screens.generate.fieldsNames.contactPhone'),
            value: _.get(parsedCard, 'tel[0].value', '').replace('tel:', ''),
          },
          {
            title: i18n.t('screens.generate.fieldsNames.contactEmail'),
            value: _.get(parsedCard, 'email[0].value', ''),
          },
        ];
        break;
      }
      if (scannedString.indexOf('BEGIN:VEVENT') > -1) {
        result.type = codeTypesList.EVENT;
        const splittedLines = scannedString.split(/\r?\n/);
        const eventData = {};
        splittedLines.forEach((line) => {
          // eslint-disable-next-line no-param-reassign
          if (line[0] === ' ') line = line.slice(1);
          // eslint-disable-next-line prefer-destructuring
          eventData[line.split(':')[0]] = line.split(':')[1];
        });
        result.fields = [
          { title: i18n.t('screens.generate.fieldsNames.eventTitle'), value: eventData.SUMMARY || '' },
          { title: i18n.t('screens.generate.fieldsNames.eventLocation'), value: eventData.LOCATION || '' },
          { title: i18n.t('screens.generate.fieldsNames.eventDescription'), value: eventData.DESCRIPTION || '' },
          { title: i18n.t('screens.generate.fieldsNames.eventStart'), value: eventData.DTSTART || '' },
          { title: i18n.t('screens.generate.fieldsNames.eventEnd'), value: eventData.DTEND || '' },
        ];
        break;
      }
      result.type = codeTypesList.TEXT;
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.text'), value: scannedString },
      ];
      break;
    }
    default:
      result.type = codeTypesList.TEXT;
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.text'), value: scannedString },
      ];
  }

  if (result.type === codeTypesList.TEXT) {
    // eslint-disable-next-line
    const urlRegexp = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    if (scannedString.match(urlRegexp)) {
      result.type = codeTypesList.URL;
      result.fields = [
        { title: i18n.t('screens.generate.fieldsNames.url'), value: scannedString },
      ];
    }
  }

  return result;
}

export default function ScannedCodeReducer(state: ScannedCodeState = initialState, action: Action): ScannedCodeState {
  switch (action.type) {
    default:
      return state;
  }
}
