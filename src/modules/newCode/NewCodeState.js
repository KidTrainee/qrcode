// @flow

export const fieldTypesList = {
  SMS_TO: 'sms_to',
  SMS_MESSAGE: 'sms_message',
  WIFI_SSID: 'wifi_ssid',
  WIFI_ENCRYPTION: 'wifi_encryption',
  WIFI_PASSWORD: 'wifi_password',
  GEO_LONG: 'geo_long',
  GEO_LAT: 'get_lat',
  CONTACT_NAME: 'contact_name',
  CONTACT_SURNAME: 'contact_surname',
  CONTACT_PHONE: 'contact_phone',
  CONTACT_EMAIL: 'contact_email',
  EVENT_TITLE: 'event_title',
  EVENT_DESCRIPTION: 'event_description',
  EVENT_LOCATION: 'event_location',
  EVENT_START: 'event_start',
  EVENT_END: 'event_end',
  TEXT: 'text',
};

export const codeTypesList = {
  TEXT: 'text',
  URL: 'url',
  EMAIL: 'email',
  TEL: 'tel',
  CONTACT: 'contact',
  SMS: 'sms',
  GEO: 'geo',
  EVENT: 'event',
  WIFI: 'wifi',
};

const CLEAR_VALUES = 'CLEAR_VALUES';
const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
const SET_CODE_TYPE = 'SET_CODE_TYPE';

type NewCodeState = {};
type Action = {
  type: string, payload: any,
};

export function clearValues():Action {
  return { type: CLEAR_VALUES };
}

export function updateField(field, value):Action {
  return {
    type: UPDATE_FIELD_VALUE,
    payload: { field, value },
  };
}

export function setCodeType(type):Action {
  return {
    type: SET_CODE_TYPE,
    payload: type,
  };
}

const initialState: NewCodeState = {
  codeType: 'Text',
  fieldValues: {},
};

export default function NewCodeReducer(state: NewCodeState = initialState, action: Action): NewCodeState {
  switch (action.type) {
    case SET_CODE_TYPE:
      return {
        ...state,
        codeType: action.payload,
      };
    case UPDATE_FIELD_VALUE:
      return {
        ...state,
        fieldValues: {
          ...state.fieldValues,
          [action.payload.field]: action.payload.value,
        },
      };
    case CLEAR_VALUES:
      return {
        ...state,
        fieldValues: {},
      };
    default:
      return state;
  }
}
