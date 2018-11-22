// @flow

type HomeState = {};
type Action = {
  type: string, payload: any,
};

const initialState: HomeState = {};

export default function HomeReducer(state: HomeState = initialState, action: Action): HomeState {
  switch (action.type) {
    default:
      return state;
  }
}
