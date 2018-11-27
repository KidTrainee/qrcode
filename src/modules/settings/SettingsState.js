// @flow

type SettingsState = {
  +items: Array<{
    content: string,
  }>,
};

type Action = {
  type: string, payload: any,
};

const initialState: SettingsState = {
  items: [],
};

export default function SettingsReducer(state: SettingsState = initialState, action: Action): SettingsState {
  switch (action.type) {
    default:
      return state;
  }
}
