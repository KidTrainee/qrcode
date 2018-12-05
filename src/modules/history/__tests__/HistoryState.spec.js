/* eslint-disable */
import Reducer, {
  addItemToHistory,
  removeItemFromHistory,
  ADD_ITEM_TO_HISTORY,
  REMOVE_ITEM_FROM_HISTORY
} from '../HistoryState';

describe('HistoryState Actions', () => {
  it('should call addItemToHistory as expected', () => {
    expect(addItemToHistory({ data: 'qrcode' })).toHaveProperty('type', ADD_ITEM_TO_HISTORY);
    expect(addItemToHistory({ data: 'qrcode' })).toHaveProperty('payload');

    const { payload } = addItemToHistory({ data: 'qrcode' });
    expect(payload).toHaveProperty('data');
    expect(payload).toHaveProperty('date');
    expect(payload).toHaveProperty('id');
  });

  it('should call removeItemFromHistory as expected', () => {
    expect(removeItemFromHistory(1)).toHaveProperty('type', REMOVE_ITEM_FROM_HISTORY);
    expect(removeItemFromHistory(1)).toHaveProperty('payload');

    const { payload } = removeItemFromHistory(1);
    expect(payload).toBe(1);
  })
});

describe('HistoryState Reducer', () => {
  it('should be function', () => {
    expect(typeof Reducer).toBe('function');
  });

  it('should handle addItemToHistory action', () => {
    const newState = Reducer({ items: [] }, addItemToHistory({ data: 'qrcode'}));

    expect(newState.items.length).toBe(1);
    expect(newState.items[0]).toHaveProperty('data');
    expect(newState.items[0]).toHaveProperty('date');
    expect(newState.items[0]).toHaveProperty('id');
  });

  it('should handle removeItemFromHistory action', () => {
    const prevState = Reducer({ items: [] }, addItemToHistory({ data: 'qrcode'}));
    const newState = Reducer(prevState, removeItemFromHistory(prevState.items[0].id));

    expect(newState.items.length).toBe(0);
  });

  it('should not handle random action', () => {
    const newState = Reducer({ items: [] }, { type: 'RANDOM_TYPE', payload: 'random_payload' });

    expect(newState).toEqual({ items: [] });
  });
});
