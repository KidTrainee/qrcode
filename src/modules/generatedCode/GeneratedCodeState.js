// @flow
import moment from 'moment';
import { codeTypesList, fieldTypesList } from '../newCode/NewCodeState';

type State = {
  codeType: string,
  fieldValues: any,
};

// TODO: Refactor this (why called *fromState?)
export const generateQRValueFromState = (state: State): string => {
  const { codeType, fieldValues } = state;

  switch (codeType) {
    case codeTypesList.EMAIL:
      return `mailto:${fieldValues[fieldTypesList.EMAIL_TO] || ''}
?subject=${fieldValues[fieldTypesList.EMAIL_SUBJECT] || ''}
&body=${fieldValues[fieldTypesList.EMAIL_BODY] || ''}`;
    case codeTypesList.SMS:
      return `SMS:${fieldValues[fieldTypesList.SMS_TO] || ''}:${fieldValues[fieldTypesList.SMS_MESSAGE] || ''}`;
    case codeTypesList.WIFI:
      return `WIFI:S:${fieldValues[fieldTypesList.WIFI_SSID] || ''};
T:${fieldValues[fieldTypesList.WIFI_ENCRYPTION] || ''};
P:${fieldValues[fieldTypesList.WIFI_PASSWORD] || ''};;`;
    case codeTypesList.GEO:
      return `geo:${fieldValues[fieldTypesList.GEO_LONG] || ''},${fieldValues[fieldTypesList.GEO_LAT] || ''}`;
    case codeTypesList.CONTACT:
      return `BEGIN:VCARD
VERSION:4.0
N:${fieldValues[fieldTypesList.CONTACT_SURNAME] || ''};${fieldValues[fieldTypesList.CONTACT_NAME] || ''};;;
FN:${fieldValues[fieldTypesList.CONTACT_NAME] || ''} ${fieldValues[fieldTypesList.CONTACT_SURNAME] || ''}
TEL:${fieldValues[fieldTypesList.CONTACT_PHONE] || ''}
EMAIL:${fieldValues[fieldTypesList.CONTACT_EMAIL] || ''}
END:VCARD`;
    case codeTypesList.EVENT:
      return `BEGIN:VEVENT
SUMMARY:${fieldValues[fieldTypesList.EVENT_TITLE] || ''}
LOCATION:${fieldValues[fieldTypesList.EVENT_LOCATION] || ''}
DESCRIPTION:${fieldValues[fieldTypesList.EVENT_DESCRIPTION] || ''}
DTSTART:${fieldValues[fieldTypesList.EVENT_START]
    ? moment(fieldValues[fieldTypesList.EVENT_START]).format('YYYYMMDDThhmmss')
    : ''
}
DTEND:${fieldValues[fieldTypesList.EVENT_START]
    ? moment(fieldValues[fieldTypesList.EVENT_END]).format('YYYYMMDDThhmmss')
    : ''
}
END:VEVENT`;
    default:
      return fieldValues[fieldTypesList.TEXT] || '';
  }
};

type GeneratedCodeState = {};

type Action = {
  type: string, payload: any,
};

export const initialState: GeneratedCodeState = {};

export default function GeneratedReducer(state: GeneratedCodeState = initialState, action: Action): GeneratedCodeState {
  switch (action.type) {
    default:
      return state;
  }
}
