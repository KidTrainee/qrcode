// @flow

type HistoryState = {
  +items: Array<{
    id: number,
    data: string,
    date: Date,
  }>,
};

type Action = {
  type: string, payload: any,
};

const initialState: HistoryState = {
  items: [],
};

export const ADD_ITEM_TO_HISTORY = 'ADD_ITEM_TO_HISTORY';
export const REMOVE_ITEM_FROM_HISTORY = 'REMOVE_ITEM_FROM_HISTORY';
export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export function addItemToHistory(scannedCode: { data: string }): Action {
  const id = Math.random().toString(36).substr(2, 9);
  const date = new Date();
  return {
    type: ADD_ITEM_TO_HISTORY,
    payload: { id, data: scannedCode.data, date },
  };
}

export function removeItemFromHistory(id: number): Action {
  return {
    type: REMOVE_ITEM_FROM_HISTORY,
    payload: id,
  };
}

export function clearHistory() {
  return {
    type: CLEAR_HISTORY,
  };
}

export default function HistoryReducer(state: HistoryState = initialState, action: Action): HistoryState {
  switch (action.type) {
    case ADD_ITEM_TO_HISTORY:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case REMOVE_ITEM_FROM_HISTORY:
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.payload),
        ],
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
