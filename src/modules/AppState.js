// @flow
type AppStateType = {
  isFirstOpen: boolean,
};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: AppStateType = {
  isFirstOpen: true,
  isPro: true,
};

export const SET_FIRST_OPEN = 'ActionType/SET_FIRST_OPEN';
export const SET_IS_PRO = 'SET_IS_PRO';

export function setAppOpened(): ActionType {
  return {
    type: SET_FIRST_OPEN,
  };
}

export function setIsPro(pro: boolean): ActionType {
  return {
    type: SET_IS_PRO,
    payload: pro,
  };
}

export default function AppStateReducer(state: AppStateType = initialState, action: ActionType): AppStateType {
  switch (action.type) {
    case SET_FIRST_OPEN:
      return {
        ...state,
        isFirstOpen: false,
      };
    case SET_IS_PRO:
      return {
        ...state,
        isPro: action.payload,
      };
    default:
      return state;
  }
}
