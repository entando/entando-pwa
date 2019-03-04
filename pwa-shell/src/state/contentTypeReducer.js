import {
  SET_CONTENT_TYPE_LIST,
  SET_CONTENT_TYPE_MAP,
  SET_SELECTED_CONTENT_TYPE,
} from 'state/types';

const initialState = {
  list: [],
  selected: null,
  map: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT_TYPE_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SET_CONTENT_TYPE_MAP:
      return {
        ...state,
        map: action.payload
      };      
    case SET_SELECTED_CONTENT_TYPE:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
};
