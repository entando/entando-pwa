import { SET_CONTENT_LIST, SET_SELECTED_CONTENT } from 'state/types';

const initialState = {
  list: [],
  selected: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.meta.contentType]: action.payload,
        },        
      };
    case SET_SELECTED_CONTENT:
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
};
