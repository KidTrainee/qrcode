// @flow
type AppStateType = {
  isFirstOpen: boolean,
};

type ActionType = {
  type: string,
  payload?: any,
};

const initialState: AppStateType = {
  isFirstOpen: true,
};

const SET_FIRST_OPEN = 'ActionType/SET_FIRST_OPEN';

export function setAppOpened(): ActionType {
  return {
    type: SET_FIRST_OPEN,
  };
}

export default function AppStateReducer(state: AppStateType = initialState, action: ActionType): AppStateType {
  switch (action.type) {
    case SET_FIRST_OPEN:
      return {
        isFirstOpen: false,
      };
    default:
      return state;
  }
}
