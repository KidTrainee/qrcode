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
    expect(parseScannedString(123)).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'Text',
        value: '123'
      }],
    });

    expect(parseScannedString(undefined)).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'Text',
        value: ''
      }],
    });

    expect(parseScannedString(null)).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'Text',
        value: ''
      }],
    });

    expect(parseScannedString('')).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'Text',
        value: ''
      }],
    });

    expect(parseScannedString('phs:')).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'Text',
        value: 'phs:'
      }],
    });

    expect(parseScannedString('begin:random')).toEqual({
      type: codeTypesList.TEXT,
      fields: [{
        title: 'Text',
        value: 'begin:random'
      }],
    });
  });

  it('should scan sms correctly', () => {
    expect(parseScannedString('sms:sms:smsmessage')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: 'sms',
      }, {
        title: 'Message',
        value: 'smsmessage',
      }],
    });

    expect(parseScannedString('sms:sms:')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: 'sms',
      }, {
        title: 'Message',
        value: '',
      }],
    });

    expect(parseScannedString('sms::')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: '',
      }, {
        title: 'Message',
        value: '',
      }],
    });

    expect(parseScannedString('sms')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: '',
      }, {
        title: 'Message',
        value: '',
      }],
    });
    expect(parseScannedString('SMSTO:sms:smsmessage')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: 'sms',
      }, {
        title: 'Message',
        value: 'smsmessage',
      }],
    });

    expect(parseScannedString('SMSTO:sms:')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: 'sms',
      }, {
        title: 'Message',
        value: '',
      }],
    });

    expect(parseScannedString('SMSTO::')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: '',
      }, {
        title: 'Message',
        value: '',
      }],
    });

    expect(parseScannedString('SMSTO')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'Phone number',
        value: '',
      }, {
        title: 'Message',
        value: '',
      }],
    });
  });

  it('should scan wifi correctly', () => {
    expect(parseScannedString('WIFI:S:WIFI_SSID;T:WIFI_ENCRYPTION;P:WIFI_PASSWORD;;')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'SSID',
        value: 'WIFI_SSID',
      }, {
        title: 'Encryption',
        value: 'WIFI_ENCRYPTION',
      }, {
        title: 'Password',
        value: 'WIFI_PASSWORD',
      }],
    });

    expect(parseScannedString('WIFI:S:WIFI_SSID;T:;P:;;')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'SSID',
        value: 'WIFI_SSID',
      }, {
        title: 'Encryption',
        value: '',
      }, {
        title: 'Password',
        value: '',
      }],
    });

    expect(parseScannedString('WIFI:S:;T:;P:;;')).toEqual({
      type: codeTypesList.WIFI,
      fields: [{
        title: 'SSID',
        value: '',
      }, {
        title: 'Encryption',
        value: '',
      }, {
        title: 'Password',
        value: '',
      }],
    });
  });

  it('should scan geo correctly', () => {
    expect(parseScannedString('geo:GEO_LONG,GEO_LAT')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'Long',
        value: 'GEO_LONG',
      }, {
        title: 'Lat',
        value: 'GEO_LAT',
      }],
    });

    expect(parseScannedString('geo:GEO_LONG,')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'Long',
        value: 'GEO_LONG',
      }, {
        title: 'Lat',
        value: '',
      }],
    });

    expect(parseScannedString('geo:,')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'Long',
        value: '',
      }, {
        title: 'Lat',
        value: '',
      }],
    });

    expect(parseScannedString('geo')).toEqual({
      type: codeTypesList.GEO,
      fields: [{
        title: 'Long',
        value: '',
      }, {
        title: 'Lat',
        value: '',
      }],
    });
  });

  it('should scan email correctly', () => {
    expect(parseScannedString('mailto:mail@example.com?subject=Your Subject&body=Body paragraph')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'To',
        value: 'mail@example.com',
      }, {
        title: 'Subject',
        value: 'Your Subject',
      }, {
        title: 'Message',
        value: 'Body paragraph',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com?body=Body paragraph&subject=Your Subject')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'To',
        value: 'mail@example.com',
      }, {
        title: 'Subject',
        value: 'Your Subject',
      }, {
        title: 'Message',
        value: 'Body paragraph',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com?subject=Your Subject')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'To',
        value: 'mail@example.com',
      }, {
        title: 'Subject',
        value: 'Your Subject',
      }, {
        title: 'Message',
        value: '',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com?body=Body paragraph')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'To',
        value: 'mail@example.com',
      }, {
        title: 'Subject',
        value: '',
      }, {
        title: 'Message',
        value: 'Body paragraph',
      }],
    });

    expect(parseScannedString('mailto:mail@example.com')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'To',
        value: 'mail@example.com',
      }, {
        title: 'Subject',
        value: '',
      }, {
        title: 'Message',
        value: '',
      }],
    });

    expect(parseScannedString('MATMSG:TO:email@example.com;SUB:email subject;BODY:Email text;;')).toEqual({
      type: codeTypesList.EMAIL,
      fields: [{
        title: 'To',
        value: 'email@example.com',
      }, {
        title: 'Subject',
        value: 'email subject',
      }, {
        title: 'Message',
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
        title: 'To',
        value: 'email@example.com',
      }, {
        title: 'Subject',
        value: 'email subject',
      }, {
        title: 'Message',
        value: 'Email text',
      }],
    });
  });

  it('should scan telephone correctly', () => {
    expect(parseScannedString('tel:telephone_number')).toEqual({
      type: codeTypesList.TEL,
      fields: [{
        title: 'Phone number',
        value: 'telephone_number',
      }],
    });

    expect(parseScannedString('tel')).toEqual({
      type: codeTypesList.TEL,
      fields: [{
        title: 'Phone number',
        value: '',
      }],
    });
  });

  it('should scan links correctly', () => {
    expect(parseScannedString('https://insiderdev.com')).toEqual({
      type: codeTypesList.URL,
      fields: [{
        title: 'URL',
        value: 'https://insiderdev.com',
      }],
    });

    expect(parseScannedString('http://insiderdev.com')).toEqual({
      type: codeTypesList.URL,
      fields: [{
        title: 'URL',
        value: 'http://insiderdev.com',
      }],
    });

    expect(parseScannedString('https://subdomain.domain.com')).toEqual({
      type: codeTypesList.URL,
      fields: [{
        title: 'URL',
        value: 'https://subdomain.domain.com',
      }],
    });

    expect(parseScannedString('https://subdomain.domain.com?prop=one&prop2=two')).toEqual({
      type: codeTypesList.URL,
      fields: [{
        title: 'URL',
        value: 'https://subdomain.domain.com?prop=one&prop2=two',
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
        title: 'First Name',
        value: 'CONTACT_NAME',
      }, {
        title: 'Last Name',
        value: 'CONTACT_SURNAME',
      }, {
        title: 'Full Name',
        value: 'CONTACT_NAME CONTACT_SURNAME',
      }, {
        title: 'Phone',
        value: 'CONTACT_PHONE',
      }, {
        title: 'Email',
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
        title: 'First Name',
        value: 'Forrest',
      }, {
        title: 'Last Name',
        value: 'Gump',
      }, {
        title: 'Full Name',
        value: 'Forrest Gump',
      }, {
        title: 'Phone',
        value: '+1-111-555-1212',
      }, {
        title: 'Email',
        value: 'forrestgump@example.com',
      }],
    });

    expect(parseScannedString(`BEGIN:VCARD
VERSION:4.0
END:VCARD`)).toEqual({
      type: codeTypesList.CONTACT,
      fields: [{
        title: 'First Name',
        value: '',
      }, {
        title: 'Last Name',
        value: '',
      }, {
        title: 'Full Name',
        value: '',
      }, {
        title: 'Phone',
        value: '',
      }, {
        title: 'Email',
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
        title: 'Title',
        value: 'EVENT_TITLE',
      }, {
        title: 'Location',
        value: 'EVENT_LOCATION',
      }, {
        title: 'Description',
        value: 'EVENT_DESCRIPTION',
      }, {
        title: 'Start',
        value: 'EVENT_START',
      }, {
        title: 'End',
        value: 'EVENT_END',
      }],
    });

    expect(parseScannedString(`BEGIN:VEVENT
END:VEVENT`)).toEqual({
      type: codeTypesList.EVENT,
      fields: [{
        title: 'Title',
        value: '',
      }, {
        title: 'Location',
        value: '',
      }, {
        title: 'Description',
        value: '',
      }, {
        title: 'Start',
        value: '',
      }, {
        title: 'End',
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
