import { SET_LANGUAGE } from 'state/language/types';

const defaultState = {
  code: 'en',
};

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        code: action.payload.code,
      };
    default:
      return state;
  }
};

export default reducer;
