// @flow

export const SET_SETTING_VALUE = 'CHANGE_SETTING_VALUE';

type SettingsState = {
  backgroundColor: string,
  foregroundColor: string,
  batch: boolean,
  vibrate: boolean,
  beep: boolean,
  history: boolean,
  duplicate: boolean,
};

type Action = {
  type: string, payload: any,
};

export const initialState: SettingsState = {
  backgroundColor: '#ffffff',
  foregroundColor: '#000000',
  batch: false,
  vibrate: true,
  beep: true,
  history: true,
  duplicate: true,
};

export function setSettingValue(data: { setting: string, value: any }) {
  return {
    type: SET_SETTING_VALUE,
    payload: data,
  };
}

export default function SettingsReducer(state: SettingsState = initialState, action: Action): SettingsState {
  switch (action.type) {
    case SET_SETTING_VALUE:
      if (action.payload.setting === 'batch' && action.payload.value === true) {
        return {
          ...state,
          history: true,
          duplicate: false,
          batch: true,
        };
      }
      return {
        ...state,
        [action.payload.setting]: action.payload.value,
      };
    default:
      return state;
  }
}
