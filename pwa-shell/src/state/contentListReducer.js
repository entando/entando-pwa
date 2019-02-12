import { SET_CONTENT_LIST } from 'state/types';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CONTENT_LIST:
      return {
        ...state,
        [action.meta.contentType]: action.payload,
      };
    default:
      return state;
  }
};
