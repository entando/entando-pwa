import { OPEN_SEARCH, CLOSE_SEARCH } from 'state/search/types';

const defaultState = {
  isOpen: false,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case OPEN_SEARCH:
      return {
        isOpen: true,
      };
    case CLOSE_SEARCH:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
