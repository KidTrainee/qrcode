// @flow

import vcard from 'vcard-parser';
import _ from 'lodash';
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

export function parseScannedString(scannedString: string): {
  type: string,
  fields: Array<{
    title: string,
    value: string,
  }>
} {
  const result = {
    type: codeTypesList.TEXT,
    fields: [],
  };

  const splittedInputString = scannedString.split(':');
  switch (scannedString.split(':')[0].toUpperCase()) {
    case 'SMS':
      result.type = codeTypesList.SMS;
      result.fields = [
        { title: 'to', value: splittedInputString[1] || '' },
        { title: 'message', value: splittedInputString[2] || '' },
      ];
      break;
    case 'WIFI':
      result.type = codeTypesList.WIFI;
      const wifiInfo = convertArrayToKeyValue(splittedInputString, 1);
      result.fields = [
        { title: 'ssid', value: wifiInfo.S || '' },
        { title: 'encryption', value: wifiInfo.T || '' },
        { title: 'password', value: wifiInfo.P || '' },
      ];
      break;
    case 'GEO':
      result.type = codeTypesList.GEO;
      const geoString = splittedInputString[1] || '';
      result.fields = [
        { title: 'longitude', value: geoString.split(',')[0] || '' },
        { title: 'latitude', value: geoString.split(',')[1] || '' },
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
        { title: 'to', value: emailString.split('?')[0] || '' },
        { title: 'subject', value: emailSubject || '' },
        { title: 'body', value: emailBody || '' },
      ];
      break;
    case 'TEL':
      result.type = codeTypesList.TEL;
      result.fields = [
        { title: 'number', value: splittedInputString[1] || '' },
      ];
      break;
    case 'BEGIN': {
      if (scannedString.indexOf('BEGIN:VCARD') > -1) {
        result.type = codeTypesList.CONTACT;
        const parsedCard = vcard.parse(scannedString);
        result.fields = [
          { title: 'name', value: _.get(parsedCard, 'n[0].value[1]', '') },
          { title: 'surname', value: _.get(parsedCard, 'n[0].value[0]', '') },
          { title: 'full name', value: _.get(parsedCard, 'fn[0].value', '') },
          { title: 'phone', value: _.get(parsedCard, 'tel[0].value', '').replace('tel:', '') },
          { title: 'email', value: _.get(parsedCard, 'email[0].value', '') },
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
          { title: 'title', value: eventData.SUMMARY || '' },
          { title: 'location', value: eventData.LOCATION || '' },
          { title: 'description', value: eventData.DESCRIPTION || '' },
          { title: 'start', value: eventData.DTSTART || '' },
          { title: 'end', value: eventData.DTEND || '' },
        ];
        break;
      }
      result.type = codeTypesList.TEXT;
      result.fields = [
        { title: 'text', value: scannedString },
      ];
      break;
    }
    default:
      result.type = codeTypesList.TEXT;
      result.fields = [
        { title: 'text', value: scannedString },
      ];
  }

  if (result.type === codeTypesList.TEXT) {
    // eslint-disable-next-line
    const urlRegexp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    if (scannedString.match(urlRegexp)) {
      result.type = codeTypesList.URL;
      result.fields = [
        { title: 'link', value: scannedString },
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
