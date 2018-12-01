// @flow

import { codeTypesList } from '../newCode/NewCodeState';

type ScannedCodeState = {
  +items: Array<{
    content: string,
  }>,
};

type Action = {
  type: string, payload: any,
};

const initialState: ScannedCodeState = {
  items: [],
};

export function parseScannedString(scannedString: string): {
  type: codeTypesList.CONTACT | codeTypesList.EMAIL | codeTypesList.EVENT | codeTypesList.GEO |
    codeTypesList.SMS | codeTypesList.TEL | codeTypesList.TEXT | codeTypesList.URL | codeTypesList.WIFI,
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

  switch (scannedString.split(':')[0]) {
    case 'SMSTO':
      result.type = codeTypesList.SMS;
      result.fields = [
        { title: 'to', value: splittedInputString[1] || '' },
        { title: 'message', value: splittedInputString[2] || '' },
      ];
      break;
    case 'WIFI':
      result.type = codeTypesList.WIFI;
      break;
    case 'geo':
      result.type = codeTypesList.GEO;
      break;
    case 'mailto':
      result.type = codeTypesList.EMAIL;
      break;
    case 'tel':
      result.type = codeTypesList.TEL;
      break;
    case 'BEGIN': {
      switch (scannedString.split(':')[1]) {
        case 'VCARD':
          result.type = codeTypesList.CONTACT;
          break;
        case 'VEVENT':
          result.type = codeTypesList.EVENT;
          break;
        default:
          result.type = codeTypesList.TEXT;
      }
      break;
    }
    default:
      result.type = codeTypesList.TEXT;
  }

  if (result.type === codeTypesList.TEXT) {
    const urlRegexp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    if (scannedString.match(urlRegexp)) {
      result.type = codeTypesList.URL;
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
