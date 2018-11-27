// @flow

type ScannerState = {};
type Action = {
  type: string, payload: any,
};

const initialState: ScannerState = {};

export default function HomeReducer(state: ScannerState = initialState, action: Action): ScannerState {
  switch (action.type) {
    default:
      return state;
  }
}
