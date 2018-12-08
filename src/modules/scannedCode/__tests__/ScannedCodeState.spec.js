/* eslint-disable */
import {
  parseScannedString,
  convertArrayToKeyValue,
} from './../ScannedCodeState';
import ScannedCodeReducer from '../ScannedCodeState';
import { codeTypesList } from '../../newCode/NewCodeState';

describe('convertArrayToKeyValue', () => {
  it ('should convert correctly', () => {
    expect(convertArrayToKeyValue(['one', 'two', 'three', 'four'])).toEqual({
      one: 'two',
      three: 'four',
    });
  });
});

describe('parseScannedString', () => {
  it('should return text with empty array on invalid strings', () => {
    expect(parseScannedString('')).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'text',
        value: ''
      }],
    });

    expect(parseScannedString('phs:')).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'text',
        value: 'phs:'
      }],
    });

    expect(parseScannedString('begin:random')).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'text',
        value: 'begin:random'
      }],
    });
  });

  it('should scan sms correctly', () => {
    expect(parseScannedString('sms:sms:smsmessage')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: 'sms',
      }, {
        title: 'message',
        value: 'smsmessage',
      }],
    });

    expect(parseScannedString('sms:sms:')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: 'sms',
      }, {
        title: 'message',
        value: '',
      }],
    });

    expect(parseScannedString('sms::')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: '',
      }, {
        title: 'message',
        value: '',
      }],
    });

    expect(parseScannedString('sms')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: '',
      }, {
        title: 'message',
        value: '',
      }],
    });
  });

  it('should scan wifi correctly', () => {
    expect(parseScannedString('WIFI:S:WIFI_SSID:T:WIFI_ENCRYPTION:P:WIFI_PASSWORD')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'ssid',
        value: 'WIFI_SSID',
      }, {
        title: 'encryption',
        value: 'WIFI_ENCRYPTION',
      }, {
        title: 'password',
        value: 'WIFI_PASSWORD',
      }],
    });

    expect(parseScannedString('WIFI:S:WIFI_SSID:T::P:')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'ssid',
        value: 'WIFI_SSID',
      }, {
        title: 'encryption',
        value: '',
      }, {
        title: 'password',
        value: '',
      }],
    });

    expect(parseScannedString('WIFI:S::T::P:')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'ssid',
        value: '',
      }, {
        title: 'encryption',
        value: '',
      }, {
        title: 'password',
        value: '',
      }],
    });

    expect(parseScannedString('WIFI:')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'ssid',
        value: '',
      }, {
        title: 'encryption',
        value: '',
      }, {
        title: 'password',
        value: '',
      }],
    });
  });

  it('should scan geo correctly', () => {
    expect(parseScannedString('geo:GEO_LONG,GEO_LAT')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'longitude',
        value: 'GEO_LONG',
      }, {
        title: 'latitude',
        value: 'GEO_LAT',
      }],
    });

    expect(parseScannedString('geo:GEO_LONG,')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'longitude',
        value: 'GEO_LONG',
      }, {
        title: 'latitude',
        value: '',
      }],
    });

    expect(parseScannedString('geo:,')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'longitude',
        value: '',
      }, {
        title: 'latitude',
        value: '',
      }],
    });

    expect(parseScannedString('geo')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'longitude',
        value: '',
      }, {
        title: 'latitude',
        value: '',
      }],
    });
  });

  it('should scan email correctly', () => {
    expect(parseScannedString('mailto:mail@example.com?subject=Your Subject&body=Body paragraph')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'mail@example.com',
      }, {
        title: 'subject',
        value: 'Your Subject',
      }, {
        title: 'body',
        value: 'Body paragraph',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com?body=Body paragraph&subject=Your Subject')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'mail@example.com',
      }, {
        title: 'subject',
        value: 'Your Subject',
      }, {
        title: 'body',
        value: 'Body paragraph',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com?subject=Your Subject')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'mail@example.com',
      }, {
        title: 'subject',
        value: 'Your Subject',
      }, {
        title: 'body',
        value: '',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com?body=Body paragraph')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'mail@example.com',
      }, {
        title: 'subject',
        value: '',
      }, {
        title: 'body',
        value: 'Body paragraph',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'mail@example.com',
      }, {
        title: 'subject',
        value: '',
      }, {
        title: 'body',
        value: '',
      }],
    });

    expect(parseScannedString('MATMSG:TO:email@example.com;SUB:email subject;BODY:Email text;;')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'email@example.com',
      }, {
        title: 'subject',
        value: 'email subject',
      }, {
        title: 'body',
        value: 'Email text',
      }],
    });

    expect(parseScannedString(`MATMSG:
TO:email@example.com;
SUB:email subject;
BODY:Email text;
;`)).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'to',
        value: 'email@example.com',
      }, {
        title: 'subject',
        value: 'email subject',
      }, {
        title: 'body',
        value: 'Email text',
      }],
    });
  });

  it('should scan telephone correctly', () => {
    expect(parseScannedString('tel:telephone_number')).toEqual({
      type: codeTypesList.TEL,
      fields: [{
        title: 'number',
        value: 'telephone_number',
      }],
    });

    expect(parseScannedString('tel')).toEqual({
      type: codeTypesList.TEL,
      fields: [{
        title: 'number',
        value: '',
      }],
    });
  });

  it('should scan email links correctly', () => {
    expect(parseScannedString('https://insiderdev.com')).toEqual({
      type: codeTypesList.URL,
      fields: [{
        title: 'link',
        value: 'https://insiderdev.com',
      }],
    });

    expect(parseScannedString('http://insiderdev.com')).toEqual({
      type: codeTypesList.URL,
      fields: [{
        title: 'link',
        value: 'http://insiderdev.com',
      }],
    });
  });

  it('should scan contact correctly', () => {
    expect(parseScannedString(`BEGIN:VCARD
VERSION:4.0
N:CONTACT_SURNAME;CONTACT_NAME;;;
FN:CONTACT_NAME CONTACT_SURNAME
TEL:CONTACT_PHONE
EMAIL:CONTACT_EMAIL
END:VCARD`)).toEqual({
      type: codeTypesList.CONTACT,
      fields: [{
        title: 'name',
        value: 'CONTACT_NAME',
      }, {
        title: 'surname',
        value: 'CONTACT_SURNAME',
      }, {
        title: 'full name',
        value: 'CONTACT_NAME CONTACT_SURNAME',
      }, {
        title: 'phone',
        value: 'CONTACT_PHONE',
      }, {
        title: 'email',
        value: 'CONTACT_EMAIL',
      }],
    });

    expect(parseScannedString(`BEGIN:VCARD
VERSION:4.0
N:Gump;Forrest;;Mr.;
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
TEL;TYPE=work,voice;VALUE=uri:tel:+1-111-555-1212
TEL;TYPE=home,voice;VALUE=uri:tel:+1-404-555-1212
ADR;TYPE=WORK;PREF=1;LABEL="100 Waters Edge\\nBaytown\\, LA 30314\\nUnited States of America":;;100 Waters Edge;Baytown;LA;30314;United States of America
ADR;TYPE=HOME;LABEL="42 Plantation St.\\nBaytown\\, LA 30314\\nUnited States of America":;;42 Plantation St.;Baytown;LA;30314;United States of America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
x-qq:21588891
END:VCARD`)).toEqual({
      type: codeTypesList.CONTACT,
      fields: [{
        title: 'name',
        value: 'Forrest',
      }, {
        title: 'surname',
        value: 'Gump',
      }, {
        title: 'full name',
        value: 'Forrest Gump',
      }, {
        title: 'phone',
        value: '+1-111-555-1212',
      }, {
        title: 'email',
        value: 'forrestgump@example.com',
      }],
    });

    expect(parseScannedString(`BEGIN:VCARD
VERSION:4.0
END:VCARD`)).toEqual({
      type: codeTypesList.CONTACT,
      fields: [{
        title: 'name',
        value: '',
      }, {
        title: 'surname',
        value: '',
      }, {
        title: 'full name',
        value: '',
      }, {
        title: 'phone',
        value: '',
      }, {
        title: 'email',
        value: '',
      }],
    });
  });

  it('should scan event correctly', () => {
    expect(parseScannedString(`BEGIN:VEVENT
SUMMARY:EVENT_TITLE
LOCATION:EVENT_LOCATION
DESCRIPTION:EVENT_DESCRIPTION
DTSTART:EVENT_START
DTEND:EVENT_END
END:VEVENT`)).toEqual({
      type: codeTypesList.EVENT,
      fields: [{
        title: 'title',
        value: 'EVENT_TITLE',
      }, {
        title: 'location',
        value: 'EVENT_LOCATION',
      }, {
        title: 'description',
        value: 'EVENT_DESCRIPTION',
      }, {
        title: 'start',
        value: 'EVENT_START',
      }, {
        title: 'end',
        value: 'EVENT_END',
      }],
    });

    expect(parseScannedString(`BEGIN:VEVENT
END:VEVENT`)).toEqual({
      type: codeTypesList.EVENT,
      fields: [{
        title: 'title',
        value: '',
      }, {
        title: 'location',
        value: '',
      }, {
        title: 'description',
        value: '',
      }, {
        title: 'start',
        value: '',
      }, {
        title: 'end',
        value: '',
      }],
    });
  });
});

describe('ScannedCodeReducer', () => {
  it('should return the same state on random action', () => {
    expect(ScannedCodeReducer({ one: 'two' }, { type: 'random' })).toEqual({ one: 'two' });
  });
});
