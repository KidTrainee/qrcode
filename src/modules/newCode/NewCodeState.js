// @flow

const CLEAR_VALUES = 'CLEAR_VALUES';
const UPDATE_FIELD_VALUE = 'UPDATE_FIELD_VALUE';
const SET_CODE_TYPE = 'SET_CODE_TYPE';

type NewCodeState = {};
type Action = {
  type: string, payload: any,
};

export function clearValues():Action {
  return { type: CLEAR_VALUES };
}

export function updateField(field, value):Action {
  return {
    type: UPDATE_FIELD_VALUE,
    payload: { field, value },
  };
}

export function setCodeType(type):Action {
  return {
    type: SET_CODE_TYPE,
    payload: type,
  };
}

const initialState: NewCodeState = {
  codeType: 'Text',
  fieldValues: {}
};

export default function NewCodeReducer(state: NewCodeState = initialState, action: Action): NewCodeState {
  switch (action.type) {
    case SET_CODE_TYPE: 
      return {
        ...state,
        codeType: action.payload,
      };
    case UPDATE_FIELD_VALUE:
      return {
        ...state,
        fieldValues: {
          ...state.fieldValues,
          [action.payload.field]: action.payload.value,
        },
      };
    case CLEAR_VALUES: 
      return {
        ...state,
        fieldValues: {}
      };
    default:
      return state;
  }
}
