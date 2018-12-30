// @flow
import i18n from '../../translations';

export const fieldTypesList = {
  EMAIL_TO: 'email_to',
  EMAIL_SUBJECT: 'email_subject',
  EMAIL_BODY: 'email_body',
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
  TEXT: i18n.t('codeTypes.text'),
  URL: i18n.t('codeTypes.url'),
  EMAIL: i18n.t('codeTypes.email'),
  TEL: i18n.t('codeTypes.tel'),
  CONTACT: i18n.t('codeTypes.contact'),
  SMS: i18n.t('codeTypes.sms'),
  GEO: i18n.t('codeTypes.geo'),
  EVENT: i18n.t('codeTypes.event'),
  WIFI: i18n.t('codeTypes.wifi'),
};

type NewCodeState = {
};

type Action = {
  type: string, payload: any,
};

const initialState: NewCodeState = {};

export default function NewCodeReducer(state: NewCodeState = initialState, action: Action): NewCodeState {
  switch (action.type) {
    default:
      return state;
  }
}
