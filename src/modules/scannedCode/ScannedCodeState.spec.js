import {
  parseScannedString,
} from './ScannedCodeState';
import {codeTypesList} from "../newCode/NewCodeState";

describe('parseScannedString', () => {
  it ('should return text with empty array on invalid strings', () => {
    expect(parseScannedString(123)).toEqual({
      type: codeTypesList.TEXT,
      fields: [],
    })
  });

  it ('should scan sms correctly', () => {
    expect(parseScannedString('SMSTO:smsto:smsmessage')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: 'smsto',
      }, {
        title: 'message',
        value: 'smsmessage',
      }],
    });

    expect(parseScannedString('SMSTO:smsto:')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: 'smsto',
      }, {
        title: 'message',
        value: '',
      }],
    });

    expect(parseScannedString('SMSTO::')).toEqual({
      type: codeTypesList.SMS,
      fields: [{
        title: 'to',
        value: '',
      }, {
        title: 'message',
        value: '',
      }],
    });

    expect(parseScannedString('SMSTO')).toEqual({
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
});
