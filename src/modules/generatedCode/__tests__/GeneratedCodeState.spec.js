/* eslint-disable */
import moment from 'moment';
import GeneratedCodeReducer, {
  generateQRValueFromState,
  initialState,
} from '../GeneratedCodeState';
import { codeTypesList, fieldTypesList  } from '../../newCode/NewCodeState';

describe('generateQRValueFromState', () => {
  it('should handle empty values with all code types', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.TEXT,
      fieldValues: {},
    })).toEqual('');

    expect(generateQRValueFromState({
      codeType: codeTypesList.SMS,
      fieldValues: {},
    })).toEqual('SMS::');

    expect(generateQRValueFromState({
      codeType: codeTypesList.CONTACT,
      fieldValues: {},
    })).toEqual(`BEGIN:VCARD
VERSION:4.0
N:;;;;
FN: 
TEL:
EMAIL:
END:VCARD`);

    expect(generateQRValueFromState({
      codeType: codeTypesList.GEO,
      fieldValues: {},
    })).toEqual(`geo:,`);

    expect(generateQRValueFromState({
      codeType: codeTypesList.EVENT,
      fieldValues: {},
    })).toEqual(`BEGIN:VEVENT
SUMMARY:
LOCATION:
DESCRIPTION:
DTSTART:
DTEND:
END:VEVENT`);

    expect(generateQRValueFromState({
        codeType: codeTypesList.WIFI,
        fieldValues: {},
      })).toEqual(`WIFI:S:;
T:;
P:;;`);

    expect(generateQRValueFromState({
      codeType: codeTypesList.EMAIL,
      fieldValues: {}
    })).toEqual(`mailto:
?subject=
&body=`);
  });

  it('should return plain text from TEXT code type', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.TEXT,
      fieldValues: {
        [fieldTypesList.TEXT]: 'text'
      },
    })).toEqual('text');
  });

  it('should return plain text from URL code types', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.TEXT,
      fieldValues: {
        [fieldTypesList.TEXT]: 'https://insiderdev.com'
      }
    })).toEqual('https://insiderdev.com');
  })

  it('should return plain text from TEL code types', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.TEXT,
      fieldValues: {
        [fieldTypesList.TEXT]: 'tel:+12345678',
      }
    })).toEqual('tel:+12345678');
  })

  it('should return valid qr from CONTACT code type', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.CONTACT,
      fieldValues: {
        [fieldTypesList.CONTACT_NAME]: 'John',
        [fieldTypesList.CONTACT_SURNAME]: 'Doe',
        [fieldTypesList.CONTACT_PHONE]: '+12345678',
        [fieldTypesList.CONTACT_EMAIL]: 'johndoe@gmail.com',
      }
    })).toEqual(`BEGIN:VCARD
VERSION:4.0
N:Doe;John;;;
FN:John Doe
TEL:+12345678
EMAIL:johndoe@gmail.com
END:VCARD`);
  })

  it('should return valid qr from EVENT code type', () => {
    const date = Date.now();
    expect(generateQRValueFromState({
      codeType: codeTypesList.EVENT,
      fieldValues: {
        [fieldTypesList.EVENT_TITLE]: 'Party',
        [fieldTypesList.EVENT_DESCRIPTION]: 'Epic Mega Hard Party with tons of alcohol',
        [fieldTypesList.EVENT_LOCATION]: 'Minsk, Amuratorskaya 4, 409',
        [fieldTypesList.EVENT_START]: date,
        [fieldTypesList.EVENT_END]: date,
      }
    })).toEqual(`BEGIN:VEVENT
SUMMARY:Party
LOCATION:Minsk, Amuratorskaya 4, 409
DESCRIPTION:Epic Mega Hard Party with tons of alcohol
DTSTART:${moment(date).format('YYYYMMDDThhmmss')}
DTEND:${moment(date).format('YYYYMMDDThhmmss')}
END:VEVENT`);
  })

  it('should return valid qr from SMS code type', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.SMS,
      fieldValues: {
        [fieldTypesList.SMS_TO]: 'johndoe@gmail.com',
        [fieldTypesList.SMS_MESSAGE]: 'We got a million dollars',
      }
    })).toEqual(`SMS:johndoe@gmail.com:We got a million dollars`);
  })

  it('should return valid qr from GEO code type', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.GEO,
      fieldValues: {
        [fieldTypesList.GEO_LONG]: '10.000000',
        [fieldTypesList.GEO_LAT]: '10.000000',
      }
    })).toEqual(`geo:10.000000,10.000000`);
  })

  it('should return valid qr from WIFI code type', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.WIFI,
      fieldValues: {
        [fieldTypesList.WIFI_SSID]: 'FREE_WIFI',
        [fieldTypesList.WIFI_ENCRYPTION]: 'WPA',
        [fieldTypesList.WIFI_PASSWORD]: '12345678',
      }
    })).toEqual(`WIFI:S:FREE_WIFI;
T:WPA;
P:12345678;;`);
  });

  it('should return valid qr from EMAIL code type', () => {
    expect(generateQRValueFromState({
      codeType: codeTypesList.EMAIL,
      fieldValues: {
        [fieldTypesList.EMAIL_TO]: 'johndoe@gmail.com',
        [fieldTypesList.EMAIL_SUBJECT]: 'Design',
        [fieldTypesList.EMAIL_BODY]: 'We are fucked up',
      }
    })).toEqual(`mailto:johndoe@gmail.com
?subject=Design
&body=We are fucked up`);
  })
});

describe('GeneratedCodeReducer', () => {
  let reducerInitialState = initialState;
  beforeEach(() => {
    reducerInitialState = initialState;
  });


  it('should not change state on random action', () => {
    expect(GeneratedCodeReducer(reducerInitialState, { type: 'random' })).toEqual({
      ...initialState,
    });
  });
});
