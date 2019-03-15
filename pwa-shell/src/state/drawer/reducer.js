import { OPEN_DRAWER, CLOSE_DRAWER } from 'state/drawer/types';

const defaultState = {
  isOpen: false,
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        isOpen: true,
      };
    case CLOSE_DRAWER:
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
