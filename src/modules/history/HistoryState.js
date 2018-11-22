// @flow

type HistoryState = {
  +items: Array<{
    content: string,
  }>,
};

type Action = {
  type: string, payload: any,
};

const initialState: HistoryState = {
  items: [],
};

export default function HistoryReducer(state: HistoryState = initialState, action: Action): HistoryState {
  switch (action.type) {
    default:
      return state;
  }
}
