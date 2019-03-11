import { createSelector } from 'reselect';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getCategoryRootCodes = state => state.category.rootCodes;
export const getCategoryList = state => state.category.list;

export const getCategoryRootCode = createSelector(
  [getSelectedContentType, getCategoryRootCodes],
  (selectedContentType, categoryRootCodes) => categoryRootCodes[selectedContentType]
);
