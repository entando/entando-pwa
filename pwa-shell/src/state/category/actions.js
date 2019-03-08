import { SET_CATEGORY_MAP, SET_CATEGORY_LIST } from 'state/category/types';

export const setCategoryMap = payload => ({
  type: SET_CATEGORY_MAP,
  payload,
});

export const setCategoryList = payload => ({
  type: SET_CATEGORY_LIST,
  payload,
});
