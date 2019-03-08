import { SET_CATEGORY_LIST } from 'state/category/types';

export const setCategoryList = payload => ({
  type: SET_CATEGORY_LIST,
  payload,
});
