import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getStandardFilters = state => state.content.filters;
export const getCategoryFilters = state => state.content.categoryFilters;

export const getSelectedStandardFilters = createSelector(
  [getSelectedContentType, getStandardFilters],
  (selectedContentType, standardFilters) => standardFilters[selectedContentType]
);

export const getSelectedCategoryFilters = createSelector(
  [getSelectedContentType, getCategoryFilters],
  (selectedContentType, categoryFilters) => categoryFilters[selectedContentType]
);

export const getContentList = state => get(state, 'content.list', []);

export const getSelectedContent = state => get(state, 'content.selected');
