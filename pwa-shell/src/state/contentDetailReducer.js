import { SET_CONTENT_DETAIL } from 'state/types';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_CONTENT_DETAIL:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};
