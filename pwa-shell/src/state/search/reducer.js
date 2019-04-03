import {
  OPEN_SEARCH,
  CLOSE_SEARCH,
  SET_SEARCH,
} from 'state/search/types';

const defaultState = {
  isOpen: false,
  searching: null,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searching: action.payload,
      }
    case OPEN_SEARCH:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_SEARCH:
      return {
        isOpen: false,
        searching: null,
      };
    default:
      return state;
  }
};

export default reducer;
