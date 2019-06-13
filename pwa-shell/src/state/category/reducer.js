import { categoryRootCodes } from 'state/appConfig';
import { SET_CATEGORY_LIST } from 'state/category/types';

const initialState = {
  rootCodes: categoryRootCodes,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
