/* eslint-disable */
import Reducer, {
  initialState,
  setSettingValue,
  SET_SETTING_VALUE,
} from '../SettingsState';

describe('SettingsState Actions', () => {
  it('should call addItemToHistory as expected', () => {
    const data = { setting: 'batch', value: true };
    expect(setSettingValue(data)).toHaveProperty('type', SET_SETTING_VALUE);
    expect(setSettingValue(data)).toHaveProperty('payload', data);

    const { payload } = setSettingValue(data);
    expect(payload).toHaveProperty('setting', data.setting);
    expect(payload).toHaveProperty('value', data.value);
  });
});

describe('SettingsState Reducer', () => {
  it('should be function', () => {
    expect(typeof Reducer).toBe('function');
  });

  it('should handle setSettingValue action', () => {
    const data = { setting: 'batch', value: true };
    const newState = Reducer(initialState, setSettingValue(data));

    expect(newState.batch).toBe(true);
    expect(newState.history).toBe(true);
    expect(newState.duplicate).toBe(false);
  });

  it('should not handle random action', () => {
    const newState = Reducer(initialState, { type: 'RANDOM_TYPE', payload: 'random_payload' });

    expect(newState).toEqual(initialState);
  });
});
