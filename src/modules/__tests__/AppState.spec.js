/* eslint-disable no-undef */
import AppStateReducer, {
  SET_FIRST_OPEN,
  setAppOpened,
  initialState,
} from '../AppState';

describe('setAppOpened', () => {
  it('should return correct action', () => {
    expect(setAppOpened()).toEqual({
      type: SET_FIRST_OPEN,
    });
  });
});

describe('AppStateReducer', () => {
  let reducerInitialState = initialState;
  beforeEach(() => {
    reducerInitialState = initialState;
  });

  it('should set is app opened to false', () => {
    expect(AppStateReducer(reducerInitialState, setAppOpened())).toEqual({
      ...initialState,
      isFirstOpen: false,
    });
  });

  it('should not change state on random action', () => {
    expect(AppStateReducer(reducerInitialState, { type: 'random' })).toEqual({
      ...initialState,
    });
  });
});
