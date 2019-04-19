import { createSelector } from 'reselect';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getCategory = state => state.category;

export const getCategoryRootCodes = createSelector(
  getCategory,
  category => category.rootCodes
);

export const getCategoryList = createSelector(
  getCategory,
  category => category.list
);

export const getCategoryMap = createSelector(
  getCategoryList,
  categoryList => categoryList.reduce((acc, curr) => ({...acc, [curr.code]: curr}), {})
);

export const getCategoryRootCode = createSelector(
  [getSelectedContentType, getCategoryRootCodes],
  (selectedContentType, categoryRootCodes) => categoryRootCodes[selectedContentType]
);
