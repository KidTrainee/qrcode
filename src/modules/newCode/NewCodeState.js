// @flow

type NewCodeState = {};
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
