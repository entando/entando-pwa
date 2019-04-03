import { get } from 'lodash';
import { createSelector } from 'reselect';
import { getSelectedContentType } from 'state/contentType/selectors';

export const getContent = state => state.content;

export const getStandardFilters = createSelector(
  getContent,
  content => content.filters,
);

export const getCategoryFilters = createSelector(
  getContent,
  content => content.categoryFilters,
);

export const getSortingFilters = createSelector(
  getContent,
  content => content.sortingFilters,
);

export const isSearchResult = createSelector(
  getContent,
  content => content.isSearchResult,
);

export const isLoading = createSelector(
  getContent,
  content => content.isLoading,
);

export const getSelectedStandardFilters = createSelector(
  [getSelectedContentType, getStandardFilters],
  (selectedContentType, standardFilters) => standardFilters[selectedContentType]
);

export const getSelectedCategoryFilters = createSelector(
  [getSelectedContentType, getCategoryFilters],
  (selectedContentType, categoryFilters) => categoryFilters[selectedContentType] || []
);

export const getSelectedSortingFilters = createSelector(
  [getSelectedContentType, getSortingFilters],
  (selectedContentType, sortingFilters) => sortingFilters[selectedContentType] || []
);

export const getContentList = state => get(state, 'content.list', []);

export const getSelectedContent = state => get(state, 'content.selected');
